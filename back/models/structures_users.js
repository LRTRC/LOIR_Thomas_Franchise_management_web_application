class StructureUser {
    constructor(id_structure, id_user) {

        try {
            // if the value isn't null or undefined and its type is string returns the value else null
            // Email can't be null in the db so the data validation needs to be stricter
            this.id_structure = id_structure != null && typeof id_structure === "number" ? id_structure : null

            // same as above
            this.id_user = id_user != null && typeof id_user === "number" ? id_user : null

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = StructureUser