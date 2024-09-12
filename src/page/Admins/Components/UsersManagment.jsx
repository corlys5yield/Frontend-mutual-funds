import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { LoadUsers } from '../Helpers/LoadUsers';
import { activateUser } from '../Helpers/ActivateUser';
import { disabledUser } from '../Helpers/DisabledUser';
import { UpdateUs } from '../Helpers/UpdateUsers';

export const UserManagementButton = ({ navigate, show, setShow }) => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () => setShow(false);
    const handleEditModalClose = () => setEditModalShow(false);
    const handleEditModalShow = (user) => {
        setSelectedUser(user);
        setEditModalShow(true);
    };

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // SweetAlert2 for enabling user
    const activateUs = (User) => {
        Swal.fire({
            title: '¿Estás seguro de habilitar este usuario?',
            text: `${User.userName} ${User.lastName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, habilitar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                activateUser(User._id);
                setNewUser(true);
            }
        });
    };

    // SweetAlert2 for disabling user
    const disabledUs = (User) => {
        Swal.fire({
            title: '¿Estás seguro de deshabilitar este usuario?',
            text: `${User.userName} ${User.lastName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, deshabilitar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                disabledUser(User._id);
                setNewUser(true);
            }
        });
    };

    // Handle form submission
    const onSubmitFormEditar = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.formEmail.value;
        const userName = form.formUserName.value;
        const lastName = form.formLastName.value;
        const rol = form.formRole.value;
        const password = form.formPassword.value.trim();

        if (email.length === 0 || userName.length === 0 || lastName.length === 0 || rol.length === 0) {
            Swal.fire({
                title: 'Faltan datos necesarios',
                text: 'Todos los campos son obligatorios.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            return;
        }

        if (password.length > 0) {
            if (password.length < 6) {
                Swal.fire({
                    title: 'Contraseña demasiado corta',
                    text: 'La contraseña debe tener al menos 6 caracteres.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
                return;
            }

            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Estás a punto de actualizar la contraseña.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, actualizar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    setEditModalShow(false);
                    
                    UpdateUs(selectedUser._id, email, userName, lastName, rol, password,navigate)
                    setNewUser(true);
                    
                    
                }
            });
        } else {
            setEditModalShow(false);
            
            UpdateUs(selectedUser._id, email, userName, lastName, rol,selectedUser.password,navigate)
            setNewUser(true);
            
            Swal.fire({
                title: 'Usuario actualizado',
                text: 'Los cambios han sido guardados exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        }
    };

    useEffect(() => {

        if (newUser) {
            LoadUsers(setUsers, navigate);
      
            setNewUser(false);
          } else {
            LoadUsers(setUsers, navigate);
          }

    }, [navigate,newUser]);

    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen={true} centered>
                <Modal.Header closeButton className='bg-intro d-flex justify-content-center'>
                    <Modal.Title className='text-light'>Gestión de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-intro'>
                    <Form.Group className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Buscar usuario..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className='btn btn-outline-warning'
                                                    onClick={() => handleEditModalShow(user)}
                                                >
                                                    <i className='bi bi-pencil-square'></i>
                                                </button>
                                                {user.status === 'active' && (
                                                    <button
                                                        className='btn btn-outline-danger'
                                                        onClick={() => disabledUs(user)}
                                                    >
                                                        <strong className='font-weight-bold'>
                                                            <i className='bi bi-person-fill-slash'></i>
                                                        </strong>
                                                    </button>
                                                )}
                                                {user.status === 'disabled' && (
                                                    <button
                                                        className='btn btn-outline-success'
                                                        onClick={() => activateUs(user)}
                                                    >
                                                        <strong className='font-weight-bold'>
                                                            <i className='bi bi-person-check'></i>
                                                        </strong>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No hay usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>

            {selectedUser && (
                <Modal show={editModalShow} onHide={handleEditModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmitFormEditar}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue={selectedUser.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="formUserName">
                                <Form.Label>Nombre de Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={selectedUser.userName}
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={selectedUser.lastName}
                                />
                            </Form.Group>

                            <Form.Group controlId="formRole">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={selectedUser.rol}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Contraseña (dejar en blanco para no cambiar)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nueva contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};
