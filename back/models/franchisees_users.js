class FranchiseeUser {
    constructor(id_franchise, id_user) {

        try {
            // if the value isn't null or undefined and its type is string returns the value else null
            // Email can't be null in the db so the data validation needs to be stricter
            this.id_franchise = id_franchise != null && typeof id_franchise === "number" ? id_franchise : null

            // same as above
            this.id_user = id_user != null && typeof id_franchise === "number" ? id_user : null

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = FranchiseeUser