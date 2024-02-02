const Response = require("../model/Response");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { IncomingMessage } = require("http");

exports.getData = async ({
  data,
  res,
  dataMethod,
  countMethod = async () => {},
  latestRecordMethod = null,
  module,
  key,
}) => {
  try {
    let latestRecordId;
    let offset;
    if (latestRecordMethod !== null) {
      const latestRecord = await latestRecordMethod.getTheLatestRecord(key);
      latestRecordId = latestRecord[0][0]?.[key] + 1;
    } else {
      offset = +data.page * data.pageSize - data.pageSize;
    }
    const dataResponse = await dataMethod({ ...data, latestRecordId, offset });
    const array = dataResponse[0];
    let lastElementId;
    if (array.length !== 0) {
      lastElementId = array[array.length - 1][key];
    }
    const isEmpty = array.length === 0;
    const dataCount = await countMethod(data);
    const count = dataCount?.[0][0]["COUNT(*)"];
    res.json(
      new Response(true, "data is fetched successfully", {
        data: array,
        module,
        count: count ? count : "",
        lastElementId,
        isEmpty,
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

exports.updateData = async ({
  primaryKey,
  imageKey,
  type,
  classObj,
  req,
  res,
}) => {
  const prefixToRemove = "http://localhost:3131/";
  const file = req.files?.[imageKey]?.[0];
  const { identifier } = req.query;
  const filePath = file?.path;
  const imageUrl = req.body?.[imageKey];
  const errors = validationResult(req);
  let url;
  if (!!imageUrl && imageUrl.startsWith(prefixToRemove)) {
    url = imageUrl.substring(prefixToRemove.length);
  } else {
    url = imageUrl;
  }
  const image = filePath ? filePath : url;
  try {
    const response = await classObj.getOne(primaryKey, identifier);
    const imageFileName = response[0][0][imageKey];
    //Delete image from images directory
    if (image) {
      const destinationPath =
        "/home/deni/Desktop/TWIND/twind-backend/" + imageFileName;
      if (fs.existsSync(destinationPath) && !!filePath) {
        fs.unlinkSync(destinationPath);
      }
    }
    //Determine response object
    let obj;
    if (imageKey === "userImgURL") {
      obj = { ...req.body, [imageKey]: image, userId: +identifier };
    } else {
      obj = { ...req.body, [imageKey]: image };
    }
    console.log(obj);
    // Check for input errors
    if (!errors.isEmpty()) {
      throw new Error(`cannot update ${type}`);
    }
    await classObj.updateData(obj, identifier);
    res.json(
      new Response(
        true,
        `${type} with id:${identifier} has been updated successfully`,
        { ...obj, userId: +identifier }
      )
    );
  } catch (err) {
    console.log(err);
    let response = new Response(false, "", errors.array());
    res.status(500).send(response);
  }
};

exports.deleteData = async ({ model, type, req, res }) => {
  const { identifier } = req.query;
  try {
    await model.deleteData(identifier);
    res.json(
      new Response(
        true,
        `${type} with id:${identifier} has been deleted successfully`,
        identifier
      )
    );
  } catch (err) {
    let response = new Response(false, err.message);
    res.status(500).send(response);
  }
};

exports.deleteImages = async ({
  model,
  field,
  identifier,
  imageField,
  res,
}) => {
  const response = await model.getOne(field, identifier);
  const imageFileName = response[0][0][imageField];
  const imagePath = path.join(
    "/home/deni/Desktop/TWIND/twind-backend",
    imageFileName
  );
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image file:", err);
      return res.status(500).json({ message: "Error deleting image file" });
    }
  });
};
