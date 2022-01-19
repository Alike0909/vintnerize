import React from 'react'
import * as vinesActions from '../../actions/vinesActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Tag from '../tag'
import './index.css'

function Taging(props) {

    const { data } = props
    const { setData } = props
    const { checkedList } = props
    const { setCheckedList } = props
    const { vinesCategory } = props

    const onDelete = (id) => {
        const filterItems = checkedList.filter((item, i) => item != id)
        setCheckedList([...filterItems])
        setData(prev => ({
            ...prev,
            page: 1,
            wine_types: filterItems.map((item) => `&wine_type[]=${item}`).join(""),
        }))
        props.vinesActions.getVines({ ...data, wine_types: filterItems.map((item) => `&wine_type[]=${item}`).join("") })
    }

    function indexation(id) {
        const temp = vinesCategory.findIndex(item => item.value == id)
        return temp
    }

    const categoryTagItems = checkedList?.map((item, id) =>
        <Tag title={vinesCategory[indexation(item)].label} key={id} onDelete={onDelete} index={item}></Tag>
    )

    return (
        <div className="category-tags">
            {categoryTagItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Taging));