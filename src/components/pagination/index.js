import React from 'react'
import * as vinesActions from '../../actions/vinesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './index.css'

function Pagination(props) {

    const { data } = props
    const { setData } = props
    const { total } = props

    const changeLimit = e => {
        setData(prev => ({
            ...prev,
            limit: e.target.value,
        }))
        props.vinesActions.getVines({ ...data, limit: e.target.value })
    }

    const previousPage = () => {
        setData(prev => ({
            ...prev,
            page: prev.page > 1 ? prev.page - 1 : 1,
        }))
        props.vinesActions.getVines({ ...data, page: data.page + 1 })
    }

    const nextPage = () => {
        setData(prev => ({
            ...prev,
            page: (total/prev.limit) > prev.page ? prev.page + 1 : prev.page,
        }))
        props.vinesActions.getVines({ ...data, page: data.page + 1 })
        console.log(data)
    }

    return (
        <div className="pagination">
            <div className="filter-items">
                <span>Items per page:</span>
                <select value={data.limit} onChange={changeLimit}>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>100</option>
                </select>
            </div>
            <div className="filter-pages">
                <button onClick={() => previousPage(-1)} style={{ pointerEvents: data.page > 1 ? 'auto' : 'none', opacity: data.page > 1 ? 1 : 0.5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </button>
                <span>{data.page}</span>
                <button onClick={() => nextPage(1)} style={{ pointerEvents: (total/data.limit) > data.page ? 'auto' : 'none', opacity: (total/data.limit) > data.page ? 1 : 0.5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pagination));