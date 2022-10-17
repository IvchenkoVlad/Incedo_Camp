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
          requestdate: Date,
          email: String
        },
        { timestamps: true }
      )
    );
  
    return User;
  };