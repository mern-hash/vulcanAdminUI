import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormTextAreaFormField,
  FormTextFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import { useEffect, useState } from 'react'
import {
  AcceptFileType,
  ErrorConstant,
  FileUploadService,
  UsersService,
} from 'utility'
import {
  CustomHeading,
  FileUploadInput,
  LoaderBar,
  SmallWithBLock,
} from 'components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'context'
import { Images } from 'images'
import styled from 'styled-components'

const ProfileImage = styled.div`
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
  margin-bottom: 40px;
  position: relative;
  border-radius: 100%;

  &:before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: ${({ theme }) => theme.colors.colorBlack};
    opacity: 0;
    border-radius: 100%;
  }

  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    opacity: 1;
    position: absolute;
    bottom: 24px;
    left: 50%;
    width: 82px;
    transform: translateX(-50%);
  }

  &:hover {
    &:before {
      opacity: 0.4;
    }
  }
`

const ButtonBlock = styled.div`
  a,
  button {
    @media screen and (max-width: 767px) {
      width: 50% !important;
      text-align: center;
    }
  }
`

const ProfileSchema = yup.object().shape({
  givenName: yup.string().trim().required('First Name is required'),
  familyName: yup.string().trim().required('Last Name is required'),
  bio: yup.string().trim(),
  address: yup.string().trim().required('Address is required'),
})

export const ProfileEditScreen = () => {
  const [images, setImages] = useState([])
  const [processing, setProcessing] = useState('')
  const { currentUser, loading, refreshUserState } = useAuth()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  })

  useEffect(() => {
    if (currentUser) {
      reset({
        ...currentUser,
      })
    }
  }, [currentUser])

  const upload = async () => {
    try {
      setProcessing('Uploading')
      const promises = images.map(async (item) => {
        const { signedUrl, url } = await FileUploadService.signedUrl({
          ext: `.${item.name.split('.').pop()}`,
          contentType: item.file.type,
          isPublic: true,
          description: 'Profile',
        })
        await FileUploadService.media(signedUrl, item.file, item.file.type)
        return url
      })
      const result = await Promise.all(promises)
      return result
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
      return []
    }
  }

  const success = async () => {
    refreshUserState()
    navigate(-1)
  }

  const save = async (formData) => {
    try {
      const imageUrl = await upload()
      setProcessing('Saving')
      const temp = {
        givenName: formData.givenName,
        familyName: formData.familyName,
        // phone_number: `+${formData.phone_number}`.replace('++','+'),
        address: formData.address,
        bio: formData.bio || '',
      }
      if (imageUrl.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        temp.picture = imageUrl[0]
      }
      await UsersService.updateProfile(temp)
      notification.success({ message: 'Profile has been saved successfully.' })
      success()
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  return (
    <div className="container">
      <SmallWithBLock>
        <CustomHeading
          heading="Edit Profile"
          subHeader="Fields marked with an asterisk (*) are required."
        />
        <Form layout="vertical" onFinish={handleSubmit(save)}>
          {(processing || loading) && <LoaderBar />}
          <ProfileImage>
            <img
              src={
                images.length > 0
                  ? URL.createObjectURL(images[0].file)
                  : currentUser?.picture || Images.profileImage
              }
              alt=""
            />
            <FileUploadInput
              files={images}
              setFiles={setImages}
              accept={AcceptFileType.image}
              maxFiles={1}
              onlyButton
              hideFiles
            />
          </ProfileImage>
          <div className="row g-3 mt-0">
            <div className="col-12 col-lg-6 col-sm-12 mt-0">
              <FormTextFormField
                name="givenName"
                control={control}
                errors={errors?.givenName}
                label="First Name"
                required
              />
            </div>
            <div className="col-12 col-lg-6 col-sm-12 mt-0">
              <FormTextFormField
                name="familyName"
                control={control}
                errors={errors?.familyName}
                label="Last Name"
                required
              />
            </div>
          </div>
          <div className="row g-3 mt-0">
            <div className="col mt-0">
              <FormTextAreaFormField
                name="bio"
                control={control}
                errors={errors?.bio}
                label="Bio"
                placeholder="Bio"
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col">
              <FormTextFormField
                name="email"
                control={control}
                errors={errors?.email}
                label="Email"
                required
                disabled
                extraLabel={<span>
                  <Link
                    to="/app/profile/change-email"
                    tabIndex={-1}
                    className="link-underline"
                  >
                    Change Email
                  </Link>
                </span>}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PhoneFormField
                name="phone_number"
                control={control}
                errors={errors?.phone_number}
                label="Phone Number"
                required
                type="number"
                disabled
                extraLabel={user?.phone_number ? <span>
                  <Link
                    to="/app/profile/change-phone"
                    tabIndex={-1}
                    className="link-underline"
                  >
                    Change Phone Number
                  </Link>
                </span> : null}
              />
            </div>
          </div> */}
          <div className="row">
            <div className="col">
              <FormTextFormField
                name="address"
                control={control}
                errors={errors?.address}
                label="Your Address"
                required
              />
            </div>
          </div>
          <div className="row my-2">
            <ButtonBlock className="d-flex d-flex justify-content-end">
              <Link to="/app/profile">
                <PrimaryButton heightsmall={1} small={1} bgnone={1}>
                  Cancel
                </PrimaryButton>
              </Link>
              <PrimaryButton
                className="ms-2"
                htmlType="submit"
                loading={!!processing}
                medium={1}
                heightsmall={1}
              >
                Update
              </PrimaryButton>
            </ButtonBlock>
          </div>
        </Form>
      </SmallWithBLock>
    </div>
  )
}
