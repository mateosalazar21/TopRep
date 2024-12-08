import { useState } from "react"

const ProfileUpdateViewModel = () => {
    
    const [values, setValues] = useState({
        username: '',
        image: ''
    })
    
    const onChange = (prop: string, value: any) => {
        setValues({...values, [prop]: value});
    }

    return{
        ...values,
        onChange,
        setValues
    }
}

export default ProfileUpdateViewModel;
