module.exports = mongoose => {
  const Project = mongoose.model(
    "project",
    mongoose.Schema(
      {
        name: String,
        sapid: String,
        projecthours: Number,
        leaveholidayhours: Number,
        noonshifts: Number,
        taeligibledays: Number,
        transportationallowance:Number,
        totalallowance: Number,
        startdate: Date,
        areafk: Number
      },
      { timestamps: true }
    )
  );

  return Project;
};