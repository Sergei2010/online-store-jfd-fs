import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../../components/common/textField";
import BackHistoryButton from "../../components/common/backButton";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, updateUser } from "../../store/users";

const EditUserPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    console.log("currentUser: ", currentUser);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((q) => q.value)
            })
        );
    };
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    { !isLoading ? (
                        <form onSubmit={ handleSubmit }>
                            <TextField
                                label="Имя"
                                name="name"
                                value={ data.name }
                                onChange={ handleChange }
                                error={ errors.name }
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={ data.email }
                                onChange={ handleChange }
                                error={ errors.email }
                            />
                            <button
                                type="submit"
                                disabled={ !isValid }
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    ) }
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
