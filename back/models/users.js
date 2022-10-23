class User {
    constructor(first_name, last_name, email, phone, role, passphrase) {
        try {
            this.first_name = first_name != null && typeof first_name === "string" ?
                first_name : first_name == null ? '' : first_name.toString()
            this.last_name = last_name != null && typeof last_name === "string" ?
                last_name : last_name == null ? '' : last_name.toString()
            this.phone = phone != null && typeof phone === "string" ?
                phone : phone == null ? '' : phone.toString()
            this.email = email != null && typeof email === "string" ? email : null
            this.role = role != null && typeof role === "string" ? role : null
            this.passphrase = passphrase != null && typeof passphrase === "string" ? passphrase : null

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = User