import { makeStyles } from '@material-ui/core/styles';

export const borderStyles = makeStyles(({ palette, ...theme }) => ({
	"@global": {
		".border-radius-0": { borderRadius: "0px !important", overflow: "hidden" },
		".border-radius-4": { borderRadius: "4px !important", overflow: "hidden" },
		".border-radius-8": { borderRadius: "8px !important", overflow: "hidden" },
		".border-radius-12": {
			borderRadius: "12px !important",
			overflow: "hidden",
		},
		".border-radius-circle": { borderRadius: "50% !important" },
		".border-none": { border: "none !important" },
		".border-transparent": { border: "1px solid transparent !important" },
		".rounded": {
			borderRadius: "300px !important",
			overflow: "hidden !important",
		},
		".rounded-l": {
			borderTopLeftRadius: "300px !important",
			borderBottomLeftRadius: "300px !important",
			overflow: "hidden !important",
		},
		".rounded-r": {
			borderTopRightRadius: "300px !important",
			borderBottomRightRadius: "300px !important",
			overflow: "hidden !important",
		},
		".border-buku-kas": {
			width: 3,
			backgroundColor: "#ddd",
			borderRadius: 3,
			height: 120,
		},
		".border-top-bottom": {
			borderTopWidth: 1,
			borderTopColor: "#d2d2d2",
			borderBottomWidth: 1,
			borderBottomColor: "#d2d2d2",
		},
	},
}));
