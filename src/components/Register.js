/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userRegisterStatus, setUserRegisterStatus] = useState("");

    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const [validate, setValidate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory()
    const validateFile = () => {
        let errors = {}
        if (!file) {
            errors.profilePicture = "Profile Picture is required"
        }
        return errors
    }

    useEffect(() => {
        if (validate) {
            const errors = validateFile()
            setError(errors)
        }
    }, [file]);

    // Function to handle register form submit
    const onRegisterFormSubmit = async (user) => {

        // setUserRegisterStatus("")

        const error = validateFile()

        if (Object.keys(error).length) {
            setError(error)
            setValidate(true)
        } else {
            setError({})
            setValidate(false)

            // Creating formData object
            const formData = new FormData()

            // Appending image to it
            formData.append("profilePicture", file, file.name)

            // Appending productObj
            formData.append("user", JSON.stringify(user))

            // Making post request to API
            setIsLoading(true)
            const { data } = await axios.post("/users/register", formData)
            if (data.status === "success") {
                setIsLoading(false)
                history.push("/login")
            } else {
                setIsLoading(false)
                setUserRegisterStatus(data.message)
            }
        }
    }

    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-11 col-sm-9 col-md-8 col-lg-6 col-xl-4 mx-auto">
                    <div className="card mx-auto shadow mb-5">
                        <div className="card-body">
                            <div className="h1 text-center">Register</div>
                            <form className="" onSubmit={handleSubmit(onRegisterFormSubmit)}>
                                {/* Name */}
                                <div className="form-floating  mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom"
                                        name="name" id="name" placeholder="#"
                                        {...register("name", { required: true })}
                                    />
                                    <label htmlFor="name">Name</label>
                                    {errors.name?.type === "required" && <p className="alert alert-danger py-2 mt-2">Name is required</p>}
                                </div>
                                {/* Username */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom"
                                        name="username" id="username" placeholder="#"
                                        {...register("username", { required: true, minLength: 4 })}
                                    />
                                    <label htmlFor="username">Username</label>
                                    {errors.username?.type === "required" && <p className="alert alert-danger py-2 mt-2">Username is required</p>}
                                    {errors.username?.type === "minLength" && <p className="alert alert-danger py-2 mt-2">Username must be of 4 chars</p>}
                                    {userRegisterStatus && <p className="alert alert-danger py-2 mt-2">Username is already taken</p>}
                                </div>
                                {/* Email */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="text" className="form-control form-control-custom" placeholder="#"
                                        {...register("email", { required: true })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email?.type === "required" && <p className="alert alert-danger py-2 mt-2">Email is required</p>}
                                </div>
                                {/* Password */}
                                <div className="form-floating mt-4">
                                    <input
                                        type="password" className="form-control form-control-custom"
                                        name="password" id="password" placeholder="#"
                                        {...register("password", { required: true })}
                                    />
                                    <label htmlFor="password">Password</label>
                                    {errors.password?.type === "required" && <p className="alert alert-danger py-2 mt-2">Password is required</p>}
                                </div>
                                {/* User Image */}
                                <div className="form-group mt-4" >
                                    <label htmlFor="formFile" className="form-label">Profile Picture</label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-control" name="profilePicture"
                                            type="file" id="formFile" accept="image/*"
                                            onChange={onFileSelect}
                                        />
                                    </div>
                                    {error.profilePicture && <p className="alert alert-danger py-2 mt-2">{error.profilePicture}</p>}
                                    {/* {errors.productImage?.type === "required" && <p className="alert alert-danger py-2 mt-2">Product Image is required</p>} */}
                                </div>
                                <div className="mt-4 text-center">
                                    {
                                        isLoading &&
                                        <LoadingSpinner message=" Registering..." />
                                    }
                                    <button className="btn btn-success mb-3">Register <FontAwesomeIcon icon={faUserPlus} /></button><br />
                                    <Link className="text-decoration-none" to="/login">Already a user? Login!</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
