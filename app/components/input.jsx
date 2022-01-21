import React, {useEffect, useRef, useState} from 'react';
import inputStyles from '../styles/input.css'
import clsx from "clsx";
import accountButtonStyles from "~/styles/button.css";

export function AccountInput({ error, icon, name, placeholder, variant, disabled, resetInput, clearIcon = false, defaultValue = '', onChange, ...otherProps }) {
    const inputRef = useRef(null);
    const [isActiveInput, setActiveInput] = useState(!!defaultValue);

    function handleFocusInput(value) {
        if (!value) {
            setActiveInput(true);
        }
    }

    function handleBlurInput(value) {
        if (!value) {
            setActiveInput(false);
        }
    }

    function handleClearInput() {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        if (resetInput) {
            setActiveInput(false);
            handleClearInput();
        }
    }, [resetInput]);

    return (
        <>
            <div className={'inputWrapperStyle'}>
                <input
                    {...otherProps}
                    name={name}
                    disabled={disabled}
                    className={'inputStyle'}
                    onFocus={(event) => handleFocusInput(event.target.value)}
                    onBlur={(event) => handleBlurInput(event.target.value)}
                    defaultValue={defaultValue}
                    onChange={(event) => {
                        if (onChange) {
                            onChange(event);
                        }
                    }}
                    ref={inputRef}
                />
                <label className={clsx('inputLabel', isActiveInput && 'inputActiveLabel')}>{placeholder}</label>
                {error && (
                    <div className={'errorStyle'}>
                        <span className={'errorText'}>{error?.message ?? error}</span>
                    </div>
                )}
            </div>
        </>
    );
}

export function AccountPasswordInput({ error, icon, name, placeholder, variant, ...otherProps }) {
    const [typeInput, setTypeInput] = useState(false);
    const [isActiveInput, setActiveInput] = useState(false);

    function handleFocusInput(value) {
        if (!value) {
            setActiveInput(true);
        }
    }

    function handleBlurInput(value) {
        if (!value) {
            setActiveInput(false);
        }
    }

    return (
        <>
            <label className={'inputWrapperStyle'}>
                <input
                    {...otherProps}
                    name={name}
                    type={typeInput ? 'text' : 'password'}
                    className={'inputStyle'}
                    error={error}
                    onFocus={(event) => handleFocusInput(event.target.value)}
                    onBlur={(event) => handleBlurInput(event.target.value)}
                />
                <label className={clsx('inputLabel', isActiveInput && 'inputActiveLabel')}>{placeholder}</label>
                {error && (
                    <div className={'errorStyle'}>
                        <span className={'errorText'}>{error?.message ?? error}</span>
                    </div>
                )}
            </label>
        </>
    );
}

export const links = () => {
    return [{ rel: "stylesheet", href: inputStyles }];
};

export default AccountInput
