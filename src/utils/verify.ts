class Verify {
    EmpytObject (imput: object) {
        const hasOwnProperty = Object.prototype.hasOwnProperty

        for (var key in imput) {
            if (hasOwnProperty.call(imput, key)) return false
        }

        return true
    }
    
    isEmpyt (imput: string)
    {
        const sanitize = imput ? imput.trim() : undefined
        const outpt = sanitize

        if (!outpt || typeof outpt == undefined || outpt == null)
        {
            return true
        }
        else
        {
            return false
        }
    }

    minLength (imput: string, min: number)
    {
        const sanitize = imput.trim()
        const outpt = sanitize

        if (outpt.length < min)
        {
            return true
        }
        else
        {
            return false
        }
    }

    maxLength (imput: string, max: number)
    {
        const sanitize = imput.trim()
        const outpt = sanitize

        if (outpt.length > max)
        {
            return true
        }
        else
        {
            return false
        }
    }

    notName (imput: string)
    {
        const sanitize = imput.trim()
        const name = sanitize

        const regex = /^([áàÁÀéèÉÈíìÍÌóÒúùÚÙa-zA-Z])([áàÁÀéèÉÈíìÍÌóÒúùÚÙ a-zA-Z]){3,}$/

        if (RegExp(regex).test(name) == false)
        {
            return true
        }
        else
        {
            return false
        }
    }

    notEmail (imput: string)
    {
        const sanitize = imput.trim()
        const email = sanitize
        
        const regex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*[@][a-zA-Z0-9_]*[.][a-zA-Z]{2,}$/

        if (RegExp(regex).test(email) == false)
        {
            return true
        }
        else
        {
            return false
        }
    }

    notSecurity (imput: string)
    {
        const sanitize = imput.trim()
        const password = sanitize

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ @#$%&*_^])[0-9a-zA-Z @#$%&*_^]{8,}$/

        if (RegExp(regex).test(password) == false)
        {
            return true
        }
        else
        {
            return false
        }
    }
}

export default new Verify