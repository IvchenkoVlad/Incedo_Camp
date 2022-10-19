module.exports = mongoose => {
    const Area = mongoose.model(
      "area",
      mongoose.Schema(
        {
          id: Number,
          name: String
        },
        { timestamps: true }
      )
    );
  
    return Area;
  };