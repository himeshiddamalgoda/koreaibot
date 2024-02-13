module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        phone: String,
        email: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Shedules = mongoose.model("Shedules", schema);
    return Shedules;
  };
  