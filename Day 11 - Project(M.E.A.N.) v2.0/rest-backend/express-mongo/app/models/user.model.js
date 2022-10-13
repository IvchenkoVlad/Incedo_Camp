  module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          username: String,
          password: String,
          name: String,
          role: String,
          status: String,
          requestdate: Date
        },
        { timestamps: true }
      )
    );
  
    return User;
  };