import './DayList.scss';

const DayList = (props) => {
    const daysList = convertToArr(props.daysList);

    function renderItems(items) {
        const days = items.map((item, i) => {
            return(
                <div key={i} className="day-list__day day">
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
        <section className="day-list sect-marg">
            <div className="day-list__grid flex">
                {items}
            </div>
        </section>
    )
}

const convertToArr = (groupedData) => {
    return Object.entries(groupedData).map(([date, data]) => {
        return {
            date,
            minTemp: _roundToOneDecimalPlace(data.minTemp),
            maxTemp: _roundToOneDecimalPlace(data.maxTemp),
            weather: data.weather,
            icon: data.icon
        };
    });
};

const _roundToOneDecimalPlace = (number) => {
    return Math.round(number * 10) / 10;
};

export default DayList;
