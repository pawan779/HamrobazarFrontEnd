import React, { Component } from 'react'
import { Container, Input } from 'reactstrap'

export default class Search extends Component {
    render() {
        return (
            <div className="Search">
                    <Input className="searchInput mx-auto"type="search" width="90%" placeholder="Search product"></Input>

            </div>

        )
    }
}
