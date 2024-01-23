const Response = require("../model/Response");

exports.getData = async ({
  data,
  res,
  dataMethod,
  countMethod = async () => {},
  module,
}) => {
  const offset = +data.page * data.pageSize - data.pageSize;
  try {
    const dataResponse = await dataMethod({ ...data, offset });
    const dataCount = await countMethod(data);
    const count = dataCount?.[0][0]["COUNT(*)"];
    res.json(
      new Response(true, "data is fetched successfully", {
        data: dataResponse[0],
        module,
        count: count ? count : "",
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(new Response(false, "Something went wrong", err));
  }
};

exports.updateLikes = async (body, id, userId, obj, res) => {
  const createdAt = new Date().toISOString();
  if (body.keyWord === "like") {
    try {
      const dataToInsert = obj.formatFormData({ ...body, createdAt });
      await obj.addData(dataToInsert);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const record = await obj.getRecord(userId, id);
      const recordId = record[0][0].likeId;
      await obj.deleteData(recordId);
      res.json(new Response(true));
    } catch (err) {
      console.log(err);
    }
  }
};
