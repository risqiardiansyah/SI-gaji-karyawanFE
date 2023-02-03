import { Card, Chip, Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

const CardItemKategori = ({ id, kategori, handleEdit, handleDelete, bukuKas }) => {
	const [OpenMenu, setOpenMenu] = useState(null);
	const handleOpen = (event) => {
		setOpenMenu(event.currentTarget);
	};
	const handleClose = () => {
		setOpenMenu(null);
	};
	return (
		<Card className="p-2 flex items-center justify-between mb-2 border-radius-4">
			<div className="flex flex-wrap items-center">
				<h6 className="m-0 mr-2 mb-1">{kategori}</h6>
				<Chip label={bukuKas} size="small" color="primary" />
			</div>
			<IconButton size="small" onClick={handleOpen}>
				<Icon fontSize="small">more_vert</Icon>
			</IconButton>

			<Menu id="simple-menu" anchorEl={OpenMenu} getContentAnchorEl={null} keepMounted open={Boolean(OpenMenu)} onClose={handleClose}>
				<MenuItem onClick={handleEdit}>Edit</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						handleDelete();
					}}
				>
					Hapus
				</MenuItem>
			</Menu>
		</Card>
	);
};

export default CardItemKategori;
