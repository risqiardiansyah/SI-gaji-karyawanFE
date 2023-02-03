import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(({ palette, ...theme }) => ({
	brand: {
		padding: "20px 18px 32px 24px",
	},
	hideOnCompact: {
		display: "none",
	},
}));

const Brand = ({ children }) => {
	const classes = useStyles();
	const { settings } = useSelector((state) => state.layout);
	const leftSidebar = settings.layout1Settings.leftSidebar;
	const { mode } = leftSidebar;
	return (
		<div className={clsx("flex items-center justify-between", classes.brand)}>
			<div className="flex items-center hide-on-mobile">
				{mode === "full" || (mode === "close" && mode === "mobile") ? (
					<img src="/assets/images/logos/logo-horizontal.png" alt="alan office" />
				) : (
					<img src="/assets/images/logos/logo-icon.png" alt="alan office" className="logo-icon" />
				)}
			</div>
			<div className="hide-on-pc mb-9"></div>
			<div
				className={clsx({
					sidenavHoverShow: true,
					[classes.hideOnCompact]: mode === "compact",
				})}
			>
				{children}
			</div>
		</div>
	);
};

export default Brand;
