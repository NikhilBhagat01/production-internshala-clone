import companyModel from "../models/companyModel.js";

export const createcompany = async (req, res) => {
  const { name, desc, url, logo } = req.body;

  try {
    const company = await companyModel.create({
      name,
      desc,
      url,
      logo,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, company });
  } catch (error) {
    console.log(error);
  }
};

export const getuserscompanyController = async (req, res) => {
  try {
    const companies = await companyModel.find({ owner: req.user._id });
    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.log(error);
  }
};

export const getsinglecompanyController = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await companyModel.findById(companyId);

    res.status(200).json({ success: true, company });
  } catch (error) {
    console.log(error);
  }
};

export const updatecompanyController = async (req, res) => {
  const { companyId } = req.params;

  try {
    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      { ...req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "company updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
