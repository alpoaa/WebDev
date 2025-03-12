import { Row, Col, Button, ListGroup, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../reducers/loggedUserReducer'
import { sendNotification } from '../reducers/notificationReducer'

import Header from './Header'

const Users = () => {
    const loggedUser = useSelector((state) => state.loggedUser)
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    if (!loggedUser) return null

    const handleClickLogout = () => {
        dispatch(signOut())
        dispatch(sendNotification('Signed out'))
    }

    return (
        <div className="container bg-light p-3">
            <Row>
                <Col sm={8}>
                    <Header message="Users" />
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <p>Username: {loggedUser.username}</p>
                    <p>Name: {loggedUser.name}</p>
                </Col>
                <Col sm={9}>
                    <Button variant="danger" onClick={handleClickLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <Header message="Blogs created" />
                </Col>
            </Row>
            <Row>
                <Col sm={10}>
                    <ListGroup as="ul">
                        {users.map((user) => (
                            <ListGroup.Item
                                key={user.id}
                                as="li"
                                className="d-flex justify-content-between align-items-start mt-1"
                                onMouseEnter={(e) =>
                                    (e.target.style.transform = 'scale(1.02')
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.transform = 'scale(1)')
                                }
                            >
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                                <Badge bg="primary" pill>
                                    Created blogs: {user.blogs.length}
                                </Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default Users
