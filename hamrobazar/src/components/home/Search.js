import React, { Component } from 'react'
import { Container, Input } from 'reactstrap'

export default class Search extends Component {
    render() {
        return (
            <div className="Search">
                    <Input className="searchInput"type="search" width="100%" placeholder="Search product"></Input>

            </div>

        )
    }
}
