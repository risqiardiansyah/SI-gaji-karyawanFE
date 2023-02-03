import { Button, Card, Icon } from '@material-ui/core';
import React from 'react';

import { CardItemKategori } from '..';

const CardKategori = ({ kategori, handleEditKategori, handleDelKategori, handleOpenAdd, id, subkategori }) => {
	return (
		<Card elevation={0} className="bg-light-gray p-3 max-h-450 border-radius-4 flex flex-column">
			<h5>{kategori}</h5>
			<div className="w-full overflow-auto h-full py-2 flex-1">
				{subkategori?.map((item, index) => (
					<CardItemKategori
						key={index}
						id={item.value}
						kategori={item.label}
						handleEdit={() => handleEditKategori(item, id)}
						handleDelete={() => handleDelKategori(item.value, id)}
						bukuKas={item.buku_nama}
					/>
				))}
			</div>
			<Button className="flex w-full" onClick={() => handleOpenAdd(id)}>
				<Icon>add</Icon>
				<p className="font-semibold m-0">Tambah Kategori</p>
			</Button>
		</Card>
	);
};

export default CardKategori;
