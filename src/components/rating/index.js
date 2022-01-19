import React from 'react'
import * as vinesActions from '../../actions/vinesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './index.css'

function Rating(props) {

    const { data } = props
    const { setData } = props

    const changeRate = e => {
        setData(prev => ({
            ...prev,
            field: e.target.selectedOptions[0].getAttribute('name'),
            rate: e.target.value,
        }))
        props.vinesActions.getVines({ ...data, field: e.target.selectedOptions[0].getAttribute('name'), rate: e.target.value })
    }

    return (
        <div className="sorting-rate" onChange={changeRate}>
            <select id="sortBy">
                <option name="ratings_average" value="desc">Rating: High to Low</option>
                <option name="ratings_average" value="asc">Rating: Low to High</option>
                <option name="name" value="asc">Name: A-Z</option>
                <option name="name" value="desc">Name: Z-A</option>
                <option name="price" value="desc">Price: High to Low</option>
                <option name="price" value="asc">Price: Low to High</option>
                <option name="year" value="desc">Year: High to Low</option>
                <option name="year" value="asc">Year: Low to High</option>
            </select>
        </div>
    )
}

const mapStateToProps = state => ({
    total: state.vines.total,
    vines: state.vines.vines,
})

const mapDispatchToProps = dispatch => ({
    vinesActions: bindActionCreators(vinesActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rating));