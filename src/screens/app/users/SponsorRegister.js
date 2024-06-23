import { Form,notification } from 'antd'
import { FormTextFormField,PrimaryButton } from 'elements'
import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonConstant, ErrorConstant,UsersService } from 'utility'
import { useNavigate } from 'react-router-dom'
import { CustomHeading,LoaderBar } from 'components'

const RegisterSchema = yup.object().shape({
	given_name: yup.string().trim().required('First Name is required'),
	family_name: yup.string().trim().required('Last Name is required'),
	email: yup.string().trim().required('Email is required').matches(CommonConstant.emailRegex,"Invalid email address"),
})

export const SponsorRegisterScreen = () => {

	const [processing,setProcessing] = useState('');
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(RegisterSchema),
	})

	const submit = async (formData) => {
		try {
			setProcessing("Loading")
			await UsersService.registerSponsor({
				email: formData.email,
				attributes: [
					{ Name: "email",Value: formData.email },
					{ Name: "name",Value: `${formData.given_name} ${formData.family_name}` },
					{ Name: "given_name",Value: formData.given_name },
					{ Name: "family_name",Value: formData.family_name },
					{ Name: "custom:activeSponsor",Value: "1" },
				],
			})
			notification.success({ message: "Sponsor has been registered successfully." });
			navigate("/app/users")
		} catch (error) {
			let errorMessage = error?.message || ErrorConstant.default;
			if (error.code === "UsernameExistsException") {
				errorMessage = "An account with the given email already exists"
			}
			notification.error({ message: errorMessage });
		} finally {
			setProcessing("")
		}
	}

	return (
		<div className="container">
			<CustomHeading
				heading="Register Sponsor"
				subHeader="Required fields have an asterisk: *"
			/>
			<Form layout="vertical" onFinish={handleSubmit(submit)}>
				{!!processing && <LoaderBar />}
				<div className="row g-3">
					<div className="col">
						<FormTextFormField
							control={control}
							name="given_name"
							label="First Name"
							errors={errors?.given_name}
							defaultValue=""
							required
						/>
					</div>
					<div className="col">
						<FormTextFormField
							control={control}
							name="family_name"
							errors={errors?.family_name}
							defaultValue=""
							label="Last Name"
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<FormTextFormField
							control={control}
							name="email"
							errors={errors?.email}
							defaultValue=""
							label="Email"
							required
						/>
					</div>
					<div className="row mt-32 justify-content-end">
						<div className="col-6 text-right">
							<div className="row g-2">
								<div className="col-6 mt-0">
									<PrimaryButton
										full={1}
										bggrey={1}
										heightmedium={1}
										border8={1}
										onClick={() => navigate(-1)}
									>
										Cancel
									</PrimaryButton>
								</div>
								<div className="col-6 mt-0">
									<PrimaryButton
										htmlType="submit"
										loading={!!processing}
										full={1}
										heightmedium={1}
										border8={1}
									>
										Submit
									</PrimaryButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}