import asyncHandler from "express-async-handler";
import Source from "../models/sourcesModel.js";

// @desc    Fetch all sources
// @route   GET /api/sources
// @access  Public
const getSources = asyncHandler(async (req, res) => {
  const sources = await Source.find({});
  res.json(sources);
});

// @desc    Fetch single source
// @route   GET /api/sources/:id
// @access  Public
const getSourceById = asyncHandler(async (req, res) => {
  const source = await Source.findById(req.params.id);
  if (source) {
    res.json(source);
  } else {
    res.status(404);
    throw new Error("Source not found");
  }
});

// @desc    Create a source
// @route   POST /api/sources
// @access  Private/Admin
const createSource = asyncHandler(async (req, res) => {
  const source = new Source({
    source: req.body.source,
  });

  const createdSource = await source.save();
  res.status(201).json(createdSource);
});

// @desc    Update a source
// @route   PUT /api/sources/:id
// @access  Private/Admin
const updateSource = asyncHandler(async (req, res) => {
  const source = await Source.findById(req.params.id);

  if (source) {
    source.source = req.body.source || source.source;

    const updatedSource = await source.save();
    res.json(updatedSource);
  } else {
    res.status(404);
    throw new Error("Source not found");
  }
});

// @desc    Delete a source
// @route   DELETE /api/sources/:id
// @access  Private/Admin
const deleteSource = asyncHandler(async (req, res) => {
  const source = await Source.findById(req.params.id);

  if (source) {
    await source.deleteOne();
    res.json({ message: "Source removed" });
  } else {
    res.status(404);
    throw new Error("Source not found");
  }
});

export { getSources, getSourceById, createSource, updateSource, deleteSource };
