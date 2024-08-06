import React from 'react';

const DropdownComponent = ({
                               data,
                               setSearchInput,
                               iconList,
                               setFilteredIcons,
                               setFilteredByCat
}) => {

    const handleChange = (e) => {

        setSearchInput("");
        const value = e.target.value.toLowerCase();

        if (value === "all") {
            setFilteredByCat(iconList);
            setFilteredIcons(iconList);
        } else {

            const filtered = iconList.filter((icon) => {
                return icon.categories.find((el) => el.match(value));
            })
            setFilteredByCat(filtered)
            setFilteredIcons(filtered);
        }
    }

    return (

        <div className="my_row position-relative">
            <select
                className="active"
                id="category_select"
                defaultValue="all"
                onChange={(e) => handleChange(e)}
            >
                <option value="all">All</option>
                {data?.map((category) => {

                    const {id, name, children, parent_id} = category;

                    return (

                        children.length > 0 ?
                            <optgroup key={id} label={name} data-parent={parent_id}>
                                <option key={children.length} value={name}>All {name}</option>
                                {children.map((child) => {
                                    const {id, name} = child;
                                    return (
                                        <option key={id} value={name}>{name}</option>
                                    )
                                })}
                            </optgroup>

                            :
                            <option key={id} value={id}>{name}</option>
                    )
                })}
            </select>
            <label htmlFor="category_select" id="category_select_label">Filter By Category</label>
        </div>
    );
};

export default DropdownComponent;
