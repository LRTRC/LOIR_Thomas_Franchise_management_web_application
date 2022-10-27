class Franchisee {
    constructor(name, address, phone, default_modules, isactive) {

        // those values are the needed keys in the default value
        const modules = [
            "subscriptions",
            "group_lessons",
            "private_coaching",
            "workforce",
            "plannings",
            "equipments",
            "advertising",
            "snacks",
        ]
        try {
            // if the value isn't null or undefined and its type is string returns the value else returns null
            // name can't be null in the db so the data validation needs to be stricter
            this.name = name != null && typeof name === "string" ? name : null

            // if the value isn't null or defined and its type is string returns value
            // else if the value is null or undefined returns default value (empty string)
            // else casts the to string
            this.address = address != null && typeof address === "string" ? address : address == null ? '' : address.toString()

            // same as above
            this.phone = phone != null && typeof phone === "string" ? phone : phone == null ? '' : phone.toString()

            // if the value isn't null or undefined and its type is string returns the value else returns null
            // isactive can't be null in the db so the data validation needs to be stricter
            this.isactive = isactive != null && typeof isactive === "boolean" ? isactive : false

            // if value isn't null or undefined and its type is object and if each key is includes in the modules array above
            // and its has strictly 8 keys returns the value else returns a default value
            this.default_modules = default_modules != null && typeof default_modules === "object" &&
            Object.keys(default_modules).some(el => modules.includes(el)) && Object.keys(default_modules).length === 8 ?
                default_modules : {
                    subscriptions: false,
                    group_lessons: false,
                    private_coaching: false,
                    workforce: false,
                    plannings: false,
                    equipments: false,
                    advertising: false,
                    snacks: false,
                }

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Franchisee