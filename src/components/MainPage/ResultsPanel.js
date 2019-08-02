import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/filterActions';
import classNames from 'classnames';
import { PulseLoader } from 'halogenium';

import TravelCard from './TravelCard';
import resultListSelector from '../../selectors/resultListSelector';

export class ResultsPanel extends React.Component {

    shouldComponentUpdate(newProps) {
        // update results only if isFetching changed OR filter changes
        if ((newProps.isFetching !== this.props.isFetching) || (newProps.filter !== this.props.filter)) return true;
        return false;
    }

    onSortByClick = (e) => {

        switch (e.target.id) {
            case 'relevanceDesc': {
                if (!(this.props.filter.sortBy === 'relevance' && this.props.filter.desc)) this.props.setFilter('relevance', true);
                return;
            }
            case 'relevanceAsc': {
                if (!(this.props.filter.sortBy === 'relevance' && !this.props.filter.desc)) this.props.setFilter('relevance', false);
                return;
            }
            case 'priceDesc': {
                if (!(this.props.filter.sortBy === 'price' && this.props.filter.desc)) this.props.setFilter('price', true);
                return;
            }
            case 'priceAsc': {
                if (!(this.props.filter.sortBy === 'price' && !this.props.filter.desc)) this.props.setFilter('price', false);
                return;
            }
            default: return;
        }
    }

    render() {

        const {
            isInitEmptyResult,
            travels,
            parametersPanel,
            parametersValue,
            isFetching,
            filter
        } = this.props;

        const travelsListSorted = resultListSelector(travels.map((travel) => {
            // Object with parameters (name: value) to render in TravelCard and average rating
            // parameters panel must be opened and value > 0
            let sum = 0, i = 0;
            const parameters = {};
            if (parametersPanel) {
                for (let param in parametersValue) {
                    if (parametersValue[param]) {
                        parameters[param] = travel.destination[param.toLowerCase() + 'Rating'];
                        sum += parameters[param];
                        i++;
                    }
                }
            }

            return {
                ...travel,
                parameters,
                avgRating: sum / i
            };

        }), filter);


        let travelsList = travelsListSorted.map((travel) => {
            return (
                <TravelCard
                    key={travel._id}
                    _id={travel._id}
                    name={travel.destination.nameEn}
                    country={travel.destination.countryEn}
                    priceAirplane={travel.priceAirplane}
                    carDistance={travel.carDistance}
                    nameEn={travel.destination.nameEn}
                    countryEn={travel.destination.countryEn}
                    parameters={travel.parameters}
                />
            );
        }

        );

        if (!isInitEmptyResult && travels.length === 0) {
            travelsList = <div className="results__spinner">
                <p className="results__text results__text--big results__text--bold">Nothing was found</p>
            </div>
        }

        // classNames assigned based on filter prop
        const relevanceDownArrow = <span id="relevanceDesc" className={classNames('results__filter-arrow', { 'results__filter-arrow--active': (filter.sortBy === 'relevance') && (filter.desc) })}>&#9660;</span>;
        const relevanceUpArrow = <span id="relevanceAsc" className={classNames('results__filter-arrow', { 'results__filter-arrow--active': (filter.sortBy === 'relevance') && (!filter.desc) })}>&#9650;</span>;
        const priceDownArrow = <span id="priceDesc" className={classNames('results__filter-arrow', { 'results__filter-arrow--active': (filter.sortBy === 'price') && (filter.desc) })}>&#9660;</span>;
        const priceUpArrow = <span id="priceAsc" className={classNames('results__filter-arrow', { 'results__filter-arrow--active': (filter.sortBy === 'price') && (!filter.desc) })}>&#9650;</span>;


        const filterPanel = <p
            onClick={this.onSortByClick}
            className="results__filter"
        >
            sort by:&ensp;
            <span className={classNames({ 'results__filter-name--active': filter.sortBy === 'relevance' })}>relevance</span>
            {relevanceDownArrow}{relevanceUpArrow} &ensp;
            <span className={classNames({ 'results__filter-name--active': filter.sortBy === 'price' })}>price</span>
            {priceDownArrow}{priceUpArrow}
        </p>

        const spinner = <div className="results__spinner">
            <PulseLoader color="#c1c1c1" />
            <p className="results__text results__text--medium">Searching</p>
        </div>

        return (
            // isFetching is TRUE: show loading spinner and remove previous travelsList (and filter)
            <div className="results__list">
                {isFetching && spinner}
                {travels.length > 1 && !isFetching ? filterPanel : null}
                {!isFetching && travelsList}
            </div>

        )
    };
};

const mapStateToProps = (state) => ({
    travels: state.travels.result,
    isFetching: state.travels.isFetching,
    isInitEmptyResult: state.travels.isInitEmptyResult,
    parametersPanel: state.searchForm.parametersPanel,
    parametersValue: state.searchForm.parametersValue,
    filter: state.filter
});

export default connect(mapStateToProps, { setFilter })(ResultsPanel);