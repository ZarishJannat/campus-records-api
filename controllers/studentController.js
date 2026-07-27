const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res, next) => {
  try {
    // Build query
    const query = {};

    // Search by name
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' };
    }

    // Filter by department
    if (req.query.department) {
      query.department = req.query.department;
    }

    // Filter by semester
    if (req.query.semester) {
      query.semester = parseInt(req.query.semester);
    }

    // Execute query with pagination and sorting
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let sortOptions = {};
    if (req.query.sort) {
      const sortField = req.query.sort;
      sortOptions[sortField] = -1; // Descending order
    } else {
      sortOptions.createdAt = -1; // Default sort by creation date
    }

    const students = await Student.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);


    console.log("Request Body:", req.body); 
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
