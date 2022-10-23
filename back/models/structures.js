class Structure {
    constructor(id_franchise,
                name,
                address,
                phone,
                isactive,
                subscriptions,
                group_lessons,
                private_coaching,
                workforce,
                plannings,
                equipments,
                advertising,
                snacks) {
        try {
            this.id_franchise = id_franchise != null && typeof id_franchise === "number" ? id_franchise : null
            this.name = name != null && typeof name === "string" ? name : null
            this.address = address != null && typeof address === "string" ? address : address == null ? '' : address.toString()
            this.phone = phone != null && typeof phone === "string" ? phone : phone == null ? '' : phone.toString()
            this.isactive = isactive != null && typeof isactive === "boolean" ? isactive : false
            this.subscriptions = subscriptions != null && typeof subscriptions === "boolean" ? subscriptions : false
            this.group_lessons = group_lessons != null && typeof group_lessons === "boolean" ? group_lessons : false
            this.private_coaching = private_coaching != null && typeof private_coaching === "boolean" ? private_coaching : false
            this.workforce = workforce != null && typeof workforce === "boolean" ? workforce : false
            this.plannings = plannings != null && typeof plannings === "boolean" ? plannings : false
            this.equipments = equipments != null && typeof equipments === "boolean" ? equipments : false
            this.advertising = advertising != null && typeof advertising === "boolean" ? advertising : false
            this.snacks = snacks != null && typeof snacks === "boolean" ? snacks : false

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Structure