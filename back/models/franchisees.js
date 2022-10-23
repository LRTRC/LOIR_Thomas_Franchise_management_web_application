class Franchisee {
    constructor(name, address, phone, default_modules, isactive) {
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
            this.name = name != null && typeof name === "string" ? name : null
            this.address = address != null && typeof address === "string" ? address : address == null ? '' : address.toString()
            this.phone = phone != null && typeof phone === "string" ? phone : phone == null ? '' : phone.toString()
            this.isactive = isactive != null && typeof isactive === "boolean" ? isactive : false
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