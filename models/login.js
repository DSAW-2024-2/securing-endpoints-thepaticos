class authModel {
  static isValidResBody(resBody) {
    return (
      typeof resBody === 'object' &&
      resBody !== null &&
      'email' in resBody &&
      'password' in resBody &&
      typeof resBody.email === 'string' &&
      typeof resBody.password === 'string'
    );
  }

  static getAuth(data) {
    if (!this.isValidResBody(data)) { 
      throw new Error("Invalid body format");
    }
    const { email, password } = data;
    if (email !== "admin@admin.com" || password !== "admin") {
      throw new Error("Invalid email or password");
    }

    return true;
  }
}

module.exports = authModel;
