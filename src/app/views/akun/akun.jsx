import { Button, ButtonGroup, CircularProgress, Grid } from '@material-ui/core';
import { editPassword, editProfile, getDetailUser } from 'app/redux/actions/UserActions';
import { SimpleCard } from 'matx';
import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class Akun extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			email: "",
			name: "",
			address_user: "",
			company_user: "",
			province_user: "",
			city_user: "",
			password: "",
			konfirm_password: "",
			old_password: "",
			submitProfile: false,
			submitPassword: false,
			isEditProfile: true,
		};
	}

	componentDidMount() {
		const { getDetailUser } = this.props;
		getDetailUser().then((res) => {
			this.setState({
				email: res.email,
				name: res.name,
			});
		});
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
			if (value !== this.state.password) {
				return false;
			}
			return true;
		});
	}

	changeActiveEdit = (type) => {
		this.setState({
			isEditProfile: type === "email",
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmitProfile = () => {
		this.setState(
			{
				submitProfile: true,
			},
			this.sendProfile
		);
	};

	sendProfile = () => {
		const { email, name, address_user, city_user, company_user, province_user } = this.state;
		const params = {
			name,
			email,
			address_user,
			company_user,
			province_user,
			city_user,
		};
		const { editProfile } = this.props;
		editProfile(params)
			.then((res) => {
				Swal.fire({
					title: "Berhasil",
					text: "Date berhasil disimpan",
					icon: "success",
					timer: 2000,
				}).then(() => {
					this.setState({
						submitProfile: false,
					});
				});
			})
			.catch((err) => {
				Swal.fire({
					title: "Gagal",
					text: "Date gagal disimpan",
					icon: "error",
					timer: 2000,
				}).then(() => {
					this.setState({
						submitProfile: false,
					});
				});
			});
	};

	handleSubmitPassword = () => {
		this.setState(
			{
				submitPassword: true,
			},
			this.sendPassword
		);
	};

	sendPassword = () => {
		const { password, old_password } = this.state;
		const params = {
			password,
			old_password,
		};
		const { editPassword } = this.props;
		editPassword(params)
			.then((res) => {
				Swal.fire({
					title: "Berhasil",
					text: "Password berhasil diganti",
					icon: "success",
					timer: 2000,
				}).then(() => {
					this.setState({
						submitPassword: false,
					});
				});
			})
			.catch((err) => {
				Swal.fire({
					title: "Gagal",
					text: "Password gagal diganti",
					icon: "error",
					timer: 2000,
				}).then(() => {
					this.setState({
						password: "",
						konfirm_password: "",
						old_password: "",
						submitPassword: false,
					});
				});
			});
	};

	render() {
		const { email, name, password, konfirm_password, submitPassword, submitProfile, isEditProfile, old_password } = this.state;
		return (
			<div className="m-sm-30">
				<Grid container spacing={3}>
					<Grid item lg={3} md={3} sm={12} xs={12}>
						<SimpleCard title="Profile">
							<img
								src={`https://ui-avatars.com/api/?name=${name}&background=97CB72&color=ffffff`}
								alt="profile"
								className="img-profile mb-3"
							/>
							<h4 className="m-0">{name}</h4>
							<p className="m-0 mb-5">{email}</p>
							<ButtonGroup>
								<Button variant="contained" color="primary" onClick={() => this.changeActiveEdit("email")} className="elevation-z0">
									Profile
								</Button>
								<Button
									variant="contained"
									color="secondary"
									className="text-white"
									onClick={() => this.changeActiveEdit("password")}
									className="elevation-z0 text-white"
								>
									Password
								</Button>
							</ButtonGroup>
						</SimpleCard>
					</Grid>
					<Grid item lg={9} md={9} sm={12} xs={12}>
						{isEditProfile ? (
							<SimpleCard title="Edit Profile">
								<ValidatorForm onSubmit={this.handleSubmitProfile}>
									<Grid container spacing={3}>
										<Grid item md={6} sm={12} xs={12}>
											<TextValidator
												className="mb-6 w-full"
												variant="outlined"
												label="Email"
												onChange={this.handleChange}
												type="email"
												name="email"
												value={email || ""}
												validators={["required", "isEmail"]}
												errorMessages={["this field is required", "email is not valid"]}
											/>
										</Grid>
										<Grid item md={6} sm={12} xs={12}>
											<TextValidator
												className="mb-6 w-full"
												variant="outlined"
												label="Nama"
												onChange={this.handleChange}
												type="text"
												name="name"
												value={name || ""}
												validators={["required", "minStringLength: 3"]}
												errorMessages={["this field is required", "Minimal panjang nama 3 karakter"]}
											/>
										</Grid>
									</Grid>
									<Button type="submit" variant="contained" color="primary" disabled={submitProfile}>
										{submitProfile ? <CircularProgress color="#fff" size={15} /> : "Simpan"}
									</Button>
								</ValidatorForm>
							</SimpleCard>
						) : (
							<SimpleCard title="Edit Password">
								<ValidatorForm onSubmit={this.handleSubmitPassword}>
									<Grid container spacing={3}>
										<Grid item md={6} sm={12} xs={12}>
											<TextValidator
												className="w-full"
												variant="outlined"
												label="Password Lama"
												onChange={this.handleChange}
												type="password"
												name="old_password"
												value={old_password || ""}
												validators={["required"]}
												errorMessages={["this field is required"]}
											/>
										</Grid>
										<Grid item md={6} sm={12} xs={12}>
											<TextValidator
												className="w-full"
												variant="outlined"
												label="Password"
												onChange={this.handleChange}
												type="password"
												name="password"
												value={password || ""}
												validators={["required", "minStringLength: 8"]}
												errorMessages={["this field is required", "Minimal panjang password 8 karakter"]}
											/>
										</Grid>
										<Grid item md={6} sm={12} xs={12}>
											<TextValidator
												className="w-full"
												variant="outlined"
												label="Konfirmasi Password"
												onChange={this.handleChange}
												type="password"
												name="konfirm_password"
												value={konfirm_password || ""}
												validators={["required", "isPasswordMatch"]}
												errorMessages={["this field is required", "Password tidak sama"]}
											/>
										</Grid>
									</Grid>
									<Button type="submit" variant="contained" color="primary" className="mt-5" disabled={submitPassword}>
										{submitPassword ? <CircularProgress color="#fff" size={15} /> : "Simpan"}
									</Button>
								</ValidatorForm>
							</SimpleCard>
						)}
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getDetailUser: () => dispatch(getDetailUser()),
		editProfile: (params) => dispatch(editProfile(params)),
		editPassword: (params) => dispatch(editPassword(params)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Akun);
