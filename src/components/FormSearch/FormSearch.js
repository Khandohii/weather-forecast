import './FormSearch.scss';
import React, { useEffect, useState} from 'react';
import { Transition } from 'react-transition-group';
import useOpenStreetMapService from '../../services/openStreetMapService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const FormSearch = (props) => {
    const [showList, setShowList] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleFocus = () => {
        setShowList(true);
    };

    const handleBlur = () => {
        setShowList(false);
    };

    const onInputChange = (event) => {
        setSearchData(event.target.value);
        clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => setShouldSearch(true), 500));
    };

    useEffect(() => {
        return () => clearTimeout(searchTimeout);
    }, [searchTimeout]);

    return (
        <div className={'form-search ' + props.className}>
            <form action="" method="get">
                <input 
                    name='city'
                    type="text" 
                    placeholder='Search City' 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={onInputChange}
                />
            </form>

            <ResultList show={showList} searchData={searchData} shouldSearch={shouldSearch} setCityFunc={props.setCityFunc} setCoordsGlobal={props.setCoordsGlobal} setShouldSearch={setShouldSearch} />
        </div>
    )
}

const ResultList = (props) => {
    const [cityList, setCityList] = useState([]);
    const {loading, error, getLocationData} = useOpenStreetMapService();

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

    useEffect(() => {
        if (props.shouldSearch && props.searchData.length > 2) {
            updateCitiesList(props.searchData);
            props.setShouldSearch(false);
        }
    }, [props.shouldSearch, props.searchData]);

    const updateCitiesList = (city) => {
        getLocationData(city).then((res) => {
            onCitiesListLoaded(res)
        })
    }

    const onCitiesListLoaded = (data) => {
        setCityList(data);
    }

    function renderItems(items) {
        const cities = items.map((item, i) => {    
            return(
                <li key={item.id}>
                    <button 
                        onClick={() => {
                            props.setCoordsGlobal(item.coords)
                            props.setCityFunc(item.name)
                        }}
                    >
                        {item.display_name}
                    </button>
                </li>
            )
        })

        if (props.searchData.length < 3) {
            return "Input minumum 3 symbols"
        }

        if (items.length < 1) {
            return "City not found"
        }

        return (
            <ul>
                {cities}
            </ul>
        );
    }

    const items = renderItems(cityList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? "Loading..." : null;

    return(
        <Transition 
            in={props.show} 
            timeout={duration}
            unmountOnExit
        >
            {state => (
                <div 
                    className='form-search__results'
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    {errorMessage}
                    {spinner || items}
                </div>
            )}
        </Transition>
    )
}

export default FormSearch;
