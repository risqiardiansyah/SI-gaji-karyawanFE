import { Card, Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import { formatRupiah } from 'app/utils/globalFunction';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CardBukuKas = ({ title, desc, price, id, handleEdit, handleDelete, currency, data }) => {
	const [MenuOpen, setMenuOpen] = useState(null);
	const handleClose = () => {
		setMenuOpen(false);
	};
	const handleClick = (event) => {
		setMenuOpen(event.currentTarget);
	};
	return (
		<Card className="p-3 flex card-buku-kas">
			<Link to={`/buku_kas/${id}`} className="flex mr-2 flex-1">
				<div className="flex">
					<div className="border-buku-kas bg-primary"></div>
					<div className="container-icon flex items-center justify-center ml-2 bg-light-primary">
						<Icon className="text-primary">import_contacts</Icon>
					</div>
				</div>
				<div className="container-content ml-3 flex-1">
					<h5 className="title font-semibold">{title}</h5>
					<p className="m-0 mb-3 desc">{desc}</p>
					<h5 className="m-0">{formatRupiah(price, currency)}</h5>
				</div>
			</Link>
			<IconButton className="btn-edit" onClick={handleClick}>
				<Icon>more_vert</Icon>
			</IconButton>

			<Menu id="simple-menu" anchorEl={MenuOpen} getContentAnchorEl={null} keepMounted open={Boolean(MenuOpen)} onClose={handleClose}>
				<MenuItem
					onClick={() => {
						handleClose();
						handleEdit(data);
					}}
				>
					Edit
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						handleDelete(id);
					}}
				>
					Hapus
				</MenuItem>
			</Menu>
		</Card>
	);
};

export default CardBukuKas;
