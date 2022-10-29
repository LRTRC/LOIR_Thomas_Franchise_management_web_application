class User {
    constructor(first_name, last_name, email, phone, role, passphrase) {
        try {
            // if the value isn't null or defined and its type is string returns value
            // else if the value is null or undefined returns default value (empty string)
            // else casts the to string
            this.first_name = first_name != null && typeof first_name === "string" ?
                first_name : first_name == null ? '' : first_name.toString()

            // same as above
            this.last_name = last_name != null && typeof last_name === "string" ?
                last_name : last_name == null ? '' : last_name.toString()

            // same as above
            this.phone = phone != null && typeof phone === "string" ?
                phone : phone == null ? '' : phone.toString()

            // if the value isn't null or undefined and its type is string returns the value else null
            // Email can't be null in the db so the data validation needs to be stricter
            this.email = email != null && typeof email === "string" ? email : null

            // same as above
            this.role = role != null && typeof role === "string" ? role : null

            // same as above
            this.passphrase = passphrase != null && typeof passphrase === "string" ? passphrase : null

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = User