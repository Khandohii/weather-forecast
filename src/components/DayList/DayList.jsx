import './DayList.scss';
import Spinner from '../Spinner/spinner';

const DayList = (props) => {
    const {daysList, weatherLoading, error} = props;

    const spinner = weatherLoading ? <Spinner /> : null;
    const content = !(spinner || error) ? <View daysList={daysList}/> : null;

    return(
        <section className="day-list sect-marg">
            {spinner}
            {content}
        </section>
    )
}

const View = (props) => {
    const daysList = convertToArr(props.daysList);

    function renderItems(items) {
        const days = items.map((item, i) => {
            if (_isTodaySpecifiedDate(item.date)) {
                return false;
            }

            return(
                <div key={i} className="day-list__day day">
                    <div className="day__day-week">{item.dayOfWeek}</div>

                    <div className="day__date">{item.date}</div>

                    <div className="day__sky-condition">{item.weather}</div>

                    <div className="day__sky-condition-icon">
                        <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt="" />
                    </div>

                    <div className="day__temp">
                        <div className="day__temp-item">
                            <div className="day__temp-item-name">Min</div>
                            <div className="day__temp-item-val">{item.minTemp} &deg;C</div>
                        </div>

                        <div className="day__temp-item">
                            <div className="day__temp-item-name">Max</div>
                            <div className="day__temp-item-val">{item.maxTemp} &deg;C</div>
                        </div>
                    </div>
                </div>
            )
        })

        return days;
    }

    const items = renderItems(daysList);

    return(
        <div className="day-list__grid flex">
            {items}
        </div>
    )
}

const convertToArr = (groupedData) => {
    return Object.entries(groupedData).map(([date, data]) => {
        return {
            date,
            minTemp: _roundToOneDecimalPlace(data.minTemp),
            maxTemp: _roundToOneDecimalPlace(data.maxTemp),
            weather: data.weather,
            dayOfWeek: data.dayOfWeek,
            icon: data.icon
        };
    });
};

const _roundToOneDecimalPlace = (number) => {
    return Math.round(number * 10) / 10;
};

function _isTodaySpecifiedDate(dateString) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    const parts = dateString.split(' ');
    const monthIndex = months.findIndex(month => month === parts[0]);
    const day = parseInt(parts[1]);

    const targetDate = new Date(today.getFullYear(), monthIndex, day);

    return today.getMonth() === targetDate.getMonth() && today.getDate() === targetDate.getDate();
}

export default DayList;
