import React, { useState } from 'react'

const Menu = () => {
    const menuItems = ["Burger", "Fries", "Shake", "Chips"]
    let menuObjArr = [];
    menuItems.forEach((e) => { 
        menuObjArr.push({ "name": e, "num": 0 })
    })
    const [order, setOrder] = useState(menuObjArr)
    const handleChange = event => {
        if (/^\d+$/.test(event.target.value)) update(event.target.id.substring(5), event.target.value)
    }
    const handleAdd = event => {
        update(event.target.name.substring(5), "add")
    }
    const handleSubtract = event => {
        update(event.target.name.substring(6), "subtract")
    }

    const update = (index, operation) => {
        let newOrder = [...order]
        if (operation=="add") {
            newOrder[index].num++
        }
        else if (operation=="subtract") {
            if (newOrder[index].num!=0) {
                newOrder[index].num--
            }
        }
        else {
            newOrder[index].num = Number(operation)
        }
        setOrder(newOrder)
    }

    return (
        <div>
            <h1>Hamburger Store</h1>
            <form>
                {
                    menuItems.map((item, index) => {
                        return (
                            <div key={"item-"+index}>
                                <label>{item}</label>
                                <br/>
                                <input name={"minus-"+index} type="button" value="-" onClick={handleSubtract} />
                                <input id={"item-"+index} name={item} value={order[index].num ? order[index].num : 0} onChange={handleChange} />
                                <input name={"plus-"+index} type="button" value="+" onClick={handleAdd} />
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default Menu;