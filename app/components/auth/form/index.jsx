import React, { useEffect, useRef } from 'react';
import Picture from '../../picture/index';
import LogoPng from '../../../../public/images/logo_yellow.png';
import { AccountInput, AccountPasswordInput } from '../../input';
import AccountButton from '../../button/index';
import authFormStyles from '../../../styles/authFormStyles.css';
import {Link, Form, useActionData} from 'remix';
import {getErrorForField} from "~/utils/common";

function AuthForm({ formInputsData, formInfo, updateSuccess, resetForm, variant = 'dark', defaultValues = {} }) {
    const formRef = useRef(null);
    const actionData = useActionData();

    useEffect(() => {
        if (resetForm && updateSuccess) {
            formRef.current.reset();
            updateSuccess(false);
        }
    }, [resetForm]);

    const { buttonVariant = 'outline', buttonSize = 'main', buttonBorder = 'light', buttonText } = formInfo?.submitButtonInfo;

    return (
        <>
            {formInfo?.topLink && (
                <div className={'topLinkContainer'}>
                    <Link to={formInfo?.topLink?.link} className={'registrationLink'}>
                        {formInfo?.topLink.text}
                    </Link>
                </div>
            )}
            {formInfo?.logo && (
                <div className={'logoContainer'}>
                    <Picture src={LogoPng} />
                </div>
            )}
            {(formInfo?.formTitle || formInfo?.titleLink) && (
                <div className={'formHeader'}>
                    {formInfo?.formTitle && <span className={'logInTitle'}>{formInfo?.formTitle}</span>}
                    {formInfo?.titleLink && (
                        <span className={'registration'}>
                            or
                            <Link to={formInfo?.titleLink?.link} className={'registrationLink'}>
                                {formInfo?.titleLink.text}
                            </Link>
                        </span>
                    )}
                </div>
            )}
            <Form ref={formRef} method={'post'}>
                {formInputsData?.map((formInput, index) => {
                    const { name, type, placeholder, required } = formInput;
                    const defaultValue = defaultValues[name] || '';

                    return (
                        <div className={'inputContainer'} key={index}>
                            {type === 'password' ? (
                                <AccountPasswordInput name={name} placeholder={placeholder} className={'input'} required={required} variant={variant} error={getErrorForField(actionData?.errors ?? [], name)} />
                            ) : (
                                <AccountInput
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    className={'input'}
                                    required={required}
                                    variant={variant}
                                    defaultValue={defaultValue}
                                    error={getErrorForField(actionData?.errors ?? [], name)}
                                />
                            )}
                        </div>
                    );
                })}
                <div className={'buttonContainer'}>
                    <AccountButton variant={buttonVariant} border={buttonBorder} size={buttonSize} type={'submit'}>
                        {buttonText}
                    </AccountButton>
                </div>
            </Form>
        </>
    );
}

export const links = () => {
    return [{ rel: "stylesheet", href: authFormStyles }];
};

export default AuthForm;
