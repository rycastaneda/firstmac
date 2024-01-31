import { useState, useEffect } from 'react'
import { User } from './types'

const INITIAL_USER = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    department: ""
}

function cleanString(input: string) {
    // Replace potentially harmful characters with their HTML entity equivalents
    const sanitizedInput = input.replace(/[&<>"'/]/g, function (char) {
        switch (char) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
            case "/":
                return '&#x2F;';
            default:
                return char;
        }
    });

    // Remove JavaScript event handlers (e.g., onclick, onmouseover, etc.)
    const safeInput = sanitizedInput.replace(/on\w+="[^"]*"/g, '');

    return safeInput;
}

const Form = ({ departments, updateUser, onSubmit, onCancel }: { departments: string[], updateUser?: User, onSubmit: Function, onCancel: Function }) => {
    const [user, setUser] = useState(INITIAL_USER)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (updateUser) {
            setUser(updateUser);
        }
    }, [updateUser])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser((prev) => {
            return {
                ...prev,
                [e.target.name]: cleanString(e.target.value),
            };
        })
        setSubmitted(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitted(true)
        e.preventDefault()
        if (user.firstName && user.lastName && user.contactNumber && user.department && user.email) {
            onSubmit(user)
            setUser(INITIAL_USER)
            setSubmitted(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 font-bold text-gray-600">First Name</label>
                <input onChange={handleChange} value={user.firstName} type="text" id="firstName" name="firstName" placeholder="Put in your first name." className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                {!user.firstName && submitted ? <p className="text-sm text-red-400 mt-2">First Name is required</p> : null}
            </div>

            <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 font-bold text-gray-600">Last Name:</label>
                <input onChange={handleChange} value={user.lastName} type="text" id="lastName" name="lastName" placeholder="Put in your last name." className="border  shadow p-3 w-full rounded mb-" />
                {!user.lastName && submitted ? <p className="text-sm text-red-400 mt-2">Last Name is required</p> : null}
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 font-bold text-gray-600">Email:</label>
                <input onChange={handleChange} value={user.email} type="email" id="email" name="email" placeholder="Email" className="border  shadow p-3 w-full rounded mb-" />
                {!user.email && submitted ? <p className="text-sm text-red-400 mt-2">Email is required</p> : null}
            </div>

            <div className="mb-5">
                <label htmlFor="contactNumber" className="block mb-2 font-bold text-gray-600">Contact Number:</label>
                <input onChange={handleChange} value={user.contactNumber} type="text" id="contactNumber" name="contactNumber" placeholder="Contact Number" className="border  shadow p-3 w-full rounded mb-" />
                {!user.contactNumber && submitted ? <p className="text-sm text-red-400 mt-2">Contact Number is required</p> : null}
            </div>

            <div className="mb-5">
                <label htmlFor="department" className="block mb-2 font-bold text-gray-600">Department:</label>
                <select name="department" value={user.department} onChange={handleChange} className="border shadow p-3 w-full rounded mb-">
                    <option>Select Department</option>
                    {departments.map((dept) => {
                        return <option key={dept} value={dept}>{dept}</option>
                    })}
                </select>
                {!user.department && submitted ? <p className="text-sm text-red-400 mt-2">Department is required</p> : null}
            </div>

            <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg mb-2">{updateUser ? `Update` : 'Create'}</button>
            {updateUser && <button onClick={() => onCancel()} className="block w-full bg-red-500 text-white font-bold p-4 rounded-lg">Cancel</button>}

        </form>
    );
}

export default Form;