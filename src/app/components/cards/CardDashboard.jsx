import { Card, Fab, Icon } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { formatRupiah } from 'app/utils/globalFunction';
import React, { Fragment } from 'react';

const CardDashboard = ({ icon, title, price, status, variant, icon_color, loading, saldo }) => {
	return (
		<Card elevation={3} className="p-4">
			<div className="flex items-center">
				<Fab size="medium" className={`${variant} circle-44 box-shadow-none`}>
					<Icon className={icon_color}>{icon}</Icon>
				</Fab>
				<h5 className="font-medium m-0 ml-3">{title}</h5>
			</div>
			<div className="pt-4 flex items-center flex-wrap">
				{loading ? (
					<Skeleton width={100} height={15} animation="wave" />
				) : (
					<Fragment>
						<h2 className="m-0 text-muted flex-grow mr-2 mb-2">{formatRupiah(price)}</h2>
						<div className="flex items-center">
							<div
								className={`flex justify-center items-centerml-3 h-16 w-16 rounded ${
									status > 0 ? "bg-green" : "bg-error"
								} text-white`}
							>
								<Icon className="text-14">{status > 0 ? "expand_less" : "expand_more"}</Icon>
							</div>
							<span className={`text-13 ${status > 0 ? "text-green" : "text-error"} ml-1`}>
								{" "}
								({status > 0 ? "+" + status : status}%)
							</span>
						</div>
					</Fragment>
				)}
			</div>
			{loading ? (
				<Skeleton width={70} height={10} animation="wave" />
			) : (
				<p className="m-0 text-muted mt-2">
					{status > 0 ? `Naik ${status}%` : `Turun ${status}%`} {saldo ? "dari saldo awal" : "dari bulan lalu"}
				</p>
			)}
		</Card>
	);
};

export default CardDashboard;
