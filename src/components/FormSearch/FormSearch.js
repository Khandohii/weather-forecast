import './FormSearch.scss';
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

const FormSearch = (props) => {
    const [showList, setShowList] = useState(false);

    const handleFocus = () => {
        setShowList(true);
    };

    const handleBlur = () => {
        setShowList(false);
    };

    return (
        <div className={'form-search ' + props.className}>
            <form action="" method="get">
                <input 
                    type="text" 
                    placeholder='Search City' 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </form>

            <ResultList show={showList} />
        </div>
    )
}

const ResultList = (props) => {
    const duration = 300;
    
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
      visibility: 'hidden'
    }
    
    const transitionStyles = {
      entering: { opacity: 1, visibility: 'visible' },
      entered:  { opacity: 1, visibility: 'visible' },
      exiting:  { opacity: 0, visibility: 'visible' },
      exited:  { opacity: 0 },
    };

    return(
        <Transition 
            in={props.show} 
            timeout={duration}
            unmountOnExit
        >
            {state => (
                <ul 
                    className='form-search__results'
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    <li>City 1</li>
                    <li>City 2</li>
                    <li>City 3</li>
                    <li>City 4</li>
                    <li>City 5</li>
                    <li>City 6</li>
                    <li>City 7</li>
                    <li>City 8</li>
                </ul>
            )}
        </Transition>
    )
}

export default FormSearch;
