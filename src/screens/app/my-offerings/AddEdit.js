import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormDateField,
  FormSelectionField,
  FormTextFormField,
  MaskedCurrencyFormField,
  MaskedNumberFormField,
  MaskedPercentageFormField,
  PrimaryButton,
  RTEFormField,
  SectionHeader,
} from 'elements'
import { Form, notification } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import {
  ErrorConstant,
  FileUploadService,
  ProjectsService,
  AssetTypes,
  DevelopmentStages,
  OfferingTypes,
  ProjectTypes,
  DateUtility,
  AcceptFileType,
  OfferingType,
  LeedCertificates,
  Strings,
  ProjectFinancialService,
  ProjectsInterestScheduleService,
  CommonUtility,
} from 'utility'
import {
  LoaderBar,
  FileUploadInput,
  CustomHeading,
  BorderWithShadow,
  CustomTooltip,
} from 'components'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GetProjectById } from 'hooks'
import {
  AroundPropertyList,
  FinancialList,
  KeyPointsList,
  ProjectStageList,
  TrancheList,
} from 'page-components/offerings'
import { Info } from 'phosphor-react'
import { InterestDistributeList } from 'page-components/offerings/interest-schedule'

const ProjectSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),

  leedCertified: yup.string().trim().required('Leed Certified is required'),
  title: yup.string().trim().required('Title is required'),
  assetType: yup.string().trim().required('Asset type is required'),
  addressLocation: yup.string().trim().required('Address location is required'),
  offeringType: yup.string().trim().required('Offering type is required'),
  projectType: yup.string().trim().required('Project type is required'),
  msa: yup.string().trim().required('MSA is required'),
  projectedAppraisedAssetValue: yup
    .number()
    .typeError('Asset value is required')
    .positive()
    .required('Asset value is required')
    .max(500000000, 'Asset value must not be greater than 500000000'),
  totalDevelopmentCost: yup
    .number()
    .typeError('Development cost is required')
    .positive()
    .required('Development cost is required')
    .max(500000000, 'Development cost must not be greater than 500000000'),
  totalFundRequired: yup
    .number()
    .typeError('Total fund value is required')
    .positive()
    .required('Total fund value is required'),
  targetedInvestorLeveredIrr: yup
    .number()
    .typeError('Levered IRR is required')
    .positive()
    .required('Levered IRR is required')
    .max(100, 'Levered IRR should not be more than 100'),
  targetedInvestorUnleveredIrr: yup
    .number()
    .typeError('Unlevered IRR is required')
    .positive()
    .required('Unlevered IRR is required')
    .max(100, 'Unlevered IRR should not be more than 100'),
  targetedEquityMultiple: yup
    .number()
    .typeError('Targeted Equity Multiple is required')
    .positive()
    .max(10, 'Targeted Equity Multiple must not be greater than 10')
    .required('Targeted Equity Multiple is required'),
  totalDevelopmentPeriodInMonths: yup
    .number()
    .typeError('Development Period is required')
    .positive()
    .required('Development Period is required'),
  navPerShare: yup
    .number()
    .typeError('NAV is required')
    .positive()
    .required('NAV is required'),
  ltmReturnPerShare: yup
    .number()
    .typeError('LTM return Per Share is required')
    .positive()
    .required('LTM return Per Share is required')
    .max(100, 'LTM Return Per Share should not be more than 100'),
  lifetimeReturn: yup
    .number()
    .typeError('Lifetime return is required')
    .positive()
    .required('Lifetime return is required')
    .max(100, 'Lifetime return should not be more than 100'),
  leased: yup
    .number()
    .typeError('Leased is required')
    .positive()
    .required('Leased is required')
    .max(100, 'Leased should not be more than 100'),
  contractedRevenueAsAPercentageOfTheProforma: yup
    .number()
    .typeError('Profoma is required')
    .positive()
    .required('Profoma is required')
    .max(100, 'Profoma should not be more than 100'),
  transactionCloseDate: yup.string().trim().required('Close date is required'),
  esgScore: yup
    .number()
    .typeError('ESG Score is required')
    .positive()
    .required('ESG Score is required')
    .max(100, 'ESG Score should not be more than 100'),
  developmentStage: yup
    .string()
    .trim()
    .required('Development Stage is required'),
  minInvestment: yup
    .number()
    .typeError('Amount is required')
    .positive()
    .required('Min Investment is required'),
  maxInvestment: yup
    .number()
    .transform((v) => (v === '' || Number.isNaN(v) ? null : v))
    .nullable(true)
    .positive()
    .when('minInvestment', (minInvestment, schema) =>
      schema.test(
        'maxInvestment',
        'Should be greater than Min Investoment',
        (maxInvestment) =>
          !maxInvestment || maxInvestment > (minInvestment || 0),
      ),
    ),
  equityTokenInfo: yup.object().shape({
    tokenPrice: yup
      .number()
      .typeError('Share Price is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Share Price is required').positive()
          : schema.optional().nullable(),
      ),
    totalTokens: yup
      .number()
      .typeError('Total Share is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Total Shares is required').positive()
          : schema.optional().nullable(),
      ),
    requiredTotalPledge: yup
      .number()
      .typeError('Required Total Pledge is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Required Total Pledge is required').positive()
          : schema.optional().nullable(),
      ),
  }),
  debtTokenInfo: yup.object().shape({
    tokenPrice: yup
      .number()
      .typeError('Share Price is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Share Price is required').positive()
          : schema.optional().nullable(),
      ),
    totalTokens: yup
      .number()
      .typeError('Total Share is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Total Share is required').positive()
          : schema.optional().nullable(),
      ),
    requiredTotalPledge: yup
      .number()
      .typeError('Required Total Pledge is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema.required('Required Total Pledge is required').positive()
          : schema.optional().nullable(),
      ),
    defaultInterestPercentage: yup
      .number()
      .typeError('Min Raise Percentage is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema
              .required('Min Raise Percentage is required')
              .positive()
              .max(100, 'Min Raise Percentage should not be more than 100')
          : schema.optional().nullable(),
      ),
    maxInterestPercentage: yup
      .number()
      .typeError('Max Raise Percentage is required')
      .when('offeringType', (offeringType, schema) =>
        [OfferingType.equity, OfferingType.both].includes(offeringType)
          ? schema
              .required('Max Raise Percentage is required')
              .positive()
              .max(100, 'Max Raise Percentage should not be more than 100')
          : schema.optional().nullable(),
      )
      .when('defaultInterestPercentage', (defaultInterestPercentage, schema) =>
        schema
          .min(
            defaultInterestPercentage,
            'Max Raise Percentage should be greater than Min Raise Percentage',
          )
          .max(100, 'Max Raise Percentage should not be more than 100'),
      ),
  }),
  aroundProperty: yup.object().shape({
    mapLink: yup
      .string()
      .trim()
      .required('Map Link is required')
      .url('Invalid Link'),
  }),
  offeringSummary: yup.string().trim().required("Offering Summary is required"),
  marketOverview: yup.string().trim().required('Market Overview is required'),
  waterfallSummary: yup.string().trim().required('Waterfall Summary is required'),
})

export const MyOfferingAddEditScreen = () => {
  const { pathname } = useLocation()
  const [images, setImages] = useState([])
  const [coverImages, setCoverImages] = useState([])
  const [tranches, setTranches] = useState([])
  const [keyPoints, setKeyPoints] = useState([])
  const [financials, setFinancials] = useState([])
  const [interestSchedules, setInterestSchedules] = useState([])
  const [stages, setStages] = useState([])
  const [landmarks, setLandmarks] = useState([])
  const [documents, setDocuments] = useState([])
  const [privateDocuments, setPrivateDocuments] = useState([])
  const [removedImages, setRemovedImage] = useState([])
  const [removedDocuments, setRemovedDocuments] = useState([])
  const [processing, setProcessing] = useState('')
  const [editMode, setEditMode] = useState(false)
  const { id } = useParams()
  const { manipulatedData: data, loading } = GetProjectById(id)
  const isFromAdmin = useMemo(
    () => pathname.includes('app/offerings/edit'),
    [pathname],
  )
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProjectSchema),
  })

  const offeringType = watch('offeringType')

  useEffect(() => {
    if (data?._id) {
      reset({
        title: data.title,
        leedCertified: data.leedCertified,
        offeringSummary: data.offeringSummary,
        developmentStage: data.developmentStage,
        esgScore: data.esgScore,
        contractedRevenueAsAPercentageOfTheProforma:
          data.contractedRevenueAsAPercentageOfTheProforma,
        leased: data.leased,
        lifetimeReturn: data.lifetimeReturn,
        ltmReturnPerShare: data.ltmReturnPerShare,
        navPerShare: data.navPerShare,
        totalDevelopmentPeriodInMonths: data.totalDevelopmentPeriodInMonths,
        targetedEquityMultiple: data.targetedEquityMultiple,
        targetedInvestorUnleveredIrr: data.targetedInvestorUnleveredIrr,
        targetedInvestorLeveredIrr: data.targetedInvestorLeveredIrr,
        totalFundRequired: data.totalFundRequired,
        totalDevelopmentCost: data.totalDevelopmentCost,
        projectedAppraisedAssetValue: data.projectedAppraisedAssetValue,
        msa: data.msa,
        projectType: data.projectType,
        offeringType: data.offeringType,
        addressLocation: data.addressLocation,
        assetType: data.assetType,
        name: data.name,
        transactionCloseDate: DateUtility.toDayJS(data.transactionCloseDate),
        minInvestment: data.minInvestment,
        maxInvestment: data.maxInvestment,
        equityTokenInfo: {
          tokenPrice: data.equityTokenInfo?.tokenPrice || 0,
          totalTokens: data.equityTokenInfo?.totalTokens || 0,
          requiredTotalPledge: data.equityTokenInfo?.requiredTotalPledge || 0,
        },
        debtTokenInfo: {
          tokenPrice: data.debtTokenInfo?.tokenPrice || 0,
          totalTokens: data.debtTokenInfo?.totalTokens || 0,
          requiredTotalPledge: data.debtTokenInfo?.requiredTotalPledge || 0,
          maxInterestPercentage: data.debtTokenInfo?.maxInterestPercentage || 0,
          defaultInterestPercentage:
            data.debtTokenInfo?.defaultInterestPercentage || 0,
        },
        aroundProperty: {
          mapLink: data?.aroundProperty?.mapLink,
        },
        waterfallSummary: data?.waterfallSummary,
        marketOverview: data?.marketOverview,
      })
      setStages(data.stages || [])
      setTranches(
        (data.tranches || []).map((item) => ({
          ...item,
          id: Math.random(),
        })),
      )
      setKeyPoints(
        (data.keyDealPoints || []).map((item) => ({
          ...item,
          id: Math.random(),
        })),
      )
      setInterestSchedules(data?.debtInterestDistributeSchedules || [])
      setFinancials(data?.financial || [])
      setLandmarks(
        (data.aroundProperty?.landmarks || []).map((item) => ({
          ...item,
          id: Math.random(),
        })),
      )
      setImages(data.images)
      setCoverImages(data.coverImage ? [data.coverImage] : [])
      setDocuments(data.publicDocuments || [])
      setPrivateDocuments(data.privateDocuments || [])
      setEditMode(true)
    }
  }, [data])

  const upload = async (projectId) => {
    try {
      setProcessing('Uploading')
      const tempImages = images.filter((x) => x.file)
      const tempDocuments = documents.filter((x) => x.file)
      const tempPrivateDocuments = privateDocuments.filter((x) => x.file)
      const promises = [
        ...tempImages,
        ...tempDocuments,
        ...tempPrivateDocuments,
      ].map(async (item, index) => {
        const isPublic = index < tempImages.length + tempDocuments.length
        const imageResult = await ProjectsService.signedFile(projectId, {
          ext: `.${item.name.split('.').pop()}`,
          contentType: item.file.type,
          isPublic,
          description: 'Project',
        })
        await FileUploadService.media(
          imageResult.signedUrl,
          item.file,
          item.file.type,
        )
        return {
          url: imageResult.url,
          key: imageResult.key,
          description: imageResult.description,
          isPublic: imageResult.isPublic,
          name: item.name,
          isImage: tempImages.length && index < tempImages.length,
        }
      })
      const result = await Promise.all(promises)
      const savePromises = []
      if (result.some((x) => x.isImage)) {
        savePromises.push(
          ProjectsService.uploadImage(
            projectId,
            result.filter((x) => x.isImage),
          ),
        )
      }
      if (result.some((x) => !x.isImage)) {
        savePromises.push(
          ProjectsService.uploadDocument(
            projectId,
            result.filter((x) => !x.isImage),
          ),
        )
      }

      if ((isFromAdmin || !editMode) && tranches.length > 0) {
        const tempTranches = tranches.map((item) => {
          const temp = { ...item }
          delete temp.id
          return temp
        })
        savePromises.push(
          ProjectsService.createTranches(projectId, tempTranches),
        )
      }

      if (!editMode && financials.length > 0) {
        financials.forEach((item) => {
          const temp = { ...item }
          delete temp._id
          savePromises.push(ProjectFinancialService.add(projectId, temp))
        })
      }

      if (!editMode && interestSchedules.length > 0) {
        interestSchedules.forEach((item) => {
          const temp = { ...item }
          delete temp._id
          savePromises.push(
            ProjectsInterestScheduleService.create(projectId, temp),
          )
        })
      }

      await Promise.all(savePromises)
      return result
    } catch (error) {
      console.log(error)
      notification.error({ message: error?.message || ErrorConstant.default })
      return []
    }
  }

  const uploadCoverImage = async (projectId) => {
    try {
      if (coverImages.length === 0 || !coverImages[0].file) {
        return
      }
      setProcessing('Uploading Cover Image')
      const tempImages = coverImages.filter((x) => x.file)

      const promises = tempImages.map(async (item) => {
        const imageResult = await ProjectsService.signedFile(projectId, {
          ext: `.${item.name.split('.').pop()}`,
          contentType: item.file.type,
          isPublic: true,
          description: 'Project Cover Image',
        })
        await FileUploadService.media(
          imageResult.signedUrl,
          item.file,
          item.file.type,
        )
        return {
          url: imageResult.url,
          key: imageResult.key,
          description: imageResult.description,
          isPublic: imageResult.isPublic,
        }
      })
      const result = await Promise.all(promises)

      await ProjectsService.patch(projectId, {
        coverImage: result[0],
      })
    } catch (error) {
      console.log(error)
      notification.error({ message: error?.message || ErrorConstant.default })
    }
  }

  const save = async (formData) => {
    try {
      if (tranches.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the tranches.',
        })
        return
      }
      if (landmarks.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the landmarks.',
        })
        return
      }
      if (keyPoints.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the key points.',
        })
        return
      }
      if (stages.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the stages.',
        })
        return
      }

      if (coverImages.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the cover image.',
        })
        return
      }
      if (images.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the picture.',
        })
        return
      }
      if (privateDocuments.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the private documents.',
        })
        return
      }
      if (documents.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the public documents.',
        })
        return
      }
      if (interestSchedules.length === 0) {
        notification.error({
          message: 'Cannot create an offer without the interest schedules.',
        })
        return
      }
      const tempStages = stages.map((x) => ({
        name: x.name,
        subStages: x.subStages.map((y) => ({ name: y.name })),
      }))
      setProcessing('Saving')
      const reqestData = {
        ...formData,
        minInvestment: CommonUtility.toDecimal(formData.minInvestment),
        maxInvestment: CommonUtility.toDecimal(formData.maxInvestment),
        ltmReturnPerShare: CommonUtility.toDecimal(formData.ltmReturnPerShare),
        navPerShare: CommonUtility.toDecimal(formData.navPerShare),
        transactionCloseDate: DateUtility.formatISO(
          formData.transactionCloseDate,
        ),
        stages: tempStages,
      }

      if (reqestData.equityTokenInfo) {
        reqestData.equityTokenInfo.tokenPrice = CommonUtility.toDecimal(
          reqestData.equityTokenInfo.tokenPrice,
        )
      }

      if (reqestData.debtTokenInfo) {
        reqestData.debtTokenInfo.tokenPrice = CommonUtility.toDecimal(
          reqestData.debtTokenInfo.tokenPrice,
        )
        reqestData.debtTokenInfo.defaultInterestPercentage =
          CommonUtility.toDecimal(
            reqestData.debtTokenInfo.defaultInterestPercentage,
          )
        reqestData.debtTokenInfo.maxInterestPercentage =
          CommonUtility.toDecimal(
            reqestData.debtTokenInfo.maxInterestPercentage,
          )
      }

      reqestData.aroundProperty.landmarks = landmarks.map((item) => ({
        name: item.name,
        distance: item.distance,
      }))

      if (keyPoints.length > 0) {
        reqestData.keyDealPoints = keyPoints.map((item) => ({
          key: item.key,
          value: item.value,
        }))
      }

      if (offeringType === OfferingType.equity) {
        delete reqestData.debtTokenInfo
      }
      if (offeringType === OfferingType.debt) {
        delete reqestData.equityTokenInfo
      }

      if (editMode) {
        await ProjectsService.patch(id, reqestData)
        const promises = []
        promises.push(ProjectsService.reEvalute(data?._id))
        if (removedImages.length > 0) {
          promises.push(ProjectsService.removeImages(id, removedImages))
        }
        if (removedDocuments.length > 0) {
          promises.push(ProjectsService.removeDocuments(id, removedDocuments))
        }
        if (promises.length > 0) {
          await Promise.all(promises)
        }
        await upload(id)
        await uploadCoverImage(id)
      } else {
        const result = await ProjectsService.add({
          ...reqestData,
          primaryVsSecondary: 'PRIMARY',
          images: [],
        })
        await upload(result._id)
        await uploadCoverImage(result._id)
      }
      notification.success({
        message: 'The project has been saved successfully.',
      })
      navigate(-1)
    } catch (error) {
      let temp = error?.message || ErrorConstant.default
      if (Array.isArray(temp)) {
        temp = temp.join('\n')
      }
      notification.error({ message: temp })
    } finally {
      setProcessing('')
    }
  }

  const removeURLImage = (file) => {
    setRemovedImage([...removedImages, file._id])
    setImages(images.filter((x) => x._id !== file._id))
  }

  const removeCoverImage = (file) => {
    setCoverImages(coverImages.filter((x) => x._id !== file._id))
  }

  const removeURLDocument = (file) => {
    setRemovedDocuments([...removedDocuments, file._id])
    setDocuments(documents.filter((x) => x._id !== file._id))
  }

  const removeURLPrivateDocument = (file) => {
    setRemovedDocuments([...removedDocuments, file._id])
    setPrivateDocuments(privateDocuments.filter((x) => x._id !== file._id))
  }

  return (
    <div className="container">
      <CustomHeading
        heading={editMode ? 'Edit an Offering' : 'Create a new Offering'}
        subHeader="Required fields have an asterisk: *"
      />
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        {(processing || loading) && <LoaderBar />}
        <BorderWithShadow className="p-4 pb-0 mb-3">
          <div className="row">
            <div className="col-12">
              <SectionHeader>General Info</SectionHeader>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-6 col-xl-6">
              <FormTextFormField
                name="name"
                control={control}
                errors={errors?.name}
                label="Offering Name"
                required
                extraLabel={
                  <CustomTooltip text="The unique identifier or title of the project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <FormTextFormField
                name="addressLocation"
                control={control}
                errors={errors?.addressLocation}
                label="Address"
                required
                extraLabel={
                  <CustomTooltip text="The physical location or property address associated with the project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <FormSelectionField
                name="assetType"
                control={control}
                errors={errors?.assetType}
                label="Asset Type"
                options={AssetTypes}
                required
                extraLabel={
                  <CustomTooltip text="The category or classification of the asset being offered for crowdfunding (e.g., offices, appartments).">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <FormSelectionField
                name="offeringType"
                control={control}
                errors={errors?.offeringType}
                label="Offering Type"
                required
                options={OfferingTypes}
                extraLabel={
                  <CustomTooltip text="The way in which the investment is structured, such as equity or debt.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-4 col-xl-4">
              <FormSelectionField
                name="projectType"
                control={control}
                errors={errors?.projectType}
                label="Project Type"
                required
                options={ProjectTypes}
                extraLabel={
                  <CustomTooltip text="The nature of the project, whether it's a real estate development, pursuit, or stabilized.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <FormTextFormField
                name="msa"
                control={control}
                errors={errors?.msa}
                label="MSA"
                required
                extraLabel={
                  <CustomTooltip text="The geographical area in which the project is located, often relevant for real estate investments.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <FormDateField
                name="transactionCloseDate"
                control={control}
                errors={errors?.transactionCloseDate}
                label="Transaction Close Date"
                required
                disabledDate={DateUtility.disabledPastDate}
                extraLabel={
                  <CustomTooltip text="The deadline or date by which investors must complete their investments.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-6 col-xl-6">
              <FormTextFormField
                name="title"
                control={control}
                errors={errors?.title}
                label="Offering Title"
                required
                extraLabel={
                  <CustomTooltip text="The official name or title given to the crowdfunding project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <FormSelectionField
                name="leedCertified"
                control={control}
                errors={errors?.leedCertified}
                label="Leed Certified"
                required
                options={LeedCertificates}
                extraLabel={
                  <CustomTooltip text="Indicates whether the project aims to achieve LEED (Leadership in Energy and Environmental Design) certification for sustainable and environmentally-friendly design.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedCurrencyFormField
                name="minInvestment"
                control={control}
                errors={errors?.minInvestment}
                label="Min Investment"
                required
                extraLabel={
                  <CustomTooltip text="The minimum amount an individual can invest in the project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedCurrencyFormField
                name="maxInvestment"
                control={control}
                errors={errors?.maxInvestment}
                label="Max Investment *"
                extraLabel={
                  <CustomTooltip text="The maximum amount an individual can invest in the project, often subject to regulatory limits.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
        </BorderWithShadow>

        {[OfferingType.equity, OfferingType.both].includes(offeringType) && (
          <BorderWithShadow className="p-4 pb-0 mb-3">
            <div className="row">
              <div className="col-12">
                <SectionHeader>Equity Token Info</SectionHeader>
              </div>
            </div>
            <div className="row gx-3">
              <div className="col-12 col-md-4 col-xl-4">
                <MaskedCurrencyFormField
                  name="equityTokenInfo.tokenPrice"
                  control={control}
                  errors={errors?.equityTokenInfo?.tokenPrice}
                  label="Token Price"
                  required
                  extraLabel={
                    <CustomTooltip text="The cost or value associated with each token offered as part of the crowdfunding project.">
                      <Info size={32} />
                    </CustomTooltip>
                  }
                />
              </div>
              <div className="col-12 col-md-4 col-xl-4">
                <MaskedNumberFormField
                  name="equityTokenInfo.totalTokens"
                  control={control}
                  errors={errors?.equityTokenInfo?.totalTokens}
                  label="Total Shares"
                  required
                  inputExtraClass="mb-4"
                  extraLabel={
                    <CustomTooltip text="The overall quantity of shares available for purchase or allocation in the project.">
                      <Info size={32} />
                    </CustomTooltip>
                  }
                />
              </div>
              <div className="cocol-12 col-md-4 col-xl-4l">
                <MaskedCurrencyFormField
                  name="equityTokenInfo.requiredTotalPledge"
                  control={control}
                  errors={errors?.equityTokenInfo?.requiredTotalPledge}
                  label="Required Total Pledge"
                  required
                  inputExtraClass="mb-4"
                  extraLabel={
                    <CustomTooltip text="The cumulative amount of funds that must be pledged by investors to meet the project's funding goal.">
                      <Info size={32} />
                    </CustomTooltip>
                  }
                />
              </div>
            </div>
          </BorderWithShadow>
        )}

        {[OfferingType.debt, OfferingType.both].includes(offeringType) && (
          <BorderWithShadow className="p-4 pb-0 mb-3">
            <div className="row">
              <div className="col-12">
                <SectionHeader>Debt Token Info</SectionHeader>
              </div>
            </div>
            <div className="row gx-3">
              <div className="col-12 col-md-4 col-xl-4">
                <MaskedCurrencyFormField
                  name="debtTokenInfo.tokenPrice"
                  control={control}
                  errors={errors?.debtTokenInfo?.tokenPrice}
                  label="Token Price"
                  required
                />
              </div>
              <div className="col-12 col-md-4 col-xl-4">
                <MaskedNumberFormField
                  name="debtTokenInfo.totalTokens"
                  control={control}
                  errors={errors?.debtTokenInfo?.totalTokens}
                  label="Total Shares"
                  required
                  inputExtraClass="mb-4"
                />
              </div>
              <div className="col-12 col-md-4 col-xl-4">
                <MaskedCurrencyFormField
                  name="debtTokenInfo.requiredTotalPledge"
                  control={control}
                  errors={errors?.debtTokenInfo?.requiredTotalPledge}
                  label="Required Total Pledge"
                  required
                  inputExtraClass="mb-4"
                />
              </div>
            </div>
            <div className="row gx-3">
              <div className="col-12 col-md-6 col-xl-6">
                <MaskedNumberFormField
                  name="debtTokenInfo.defaultInterestPercentage"
                  control={control}
                  errors={errors?.debtTokenInfo?.defaultInterestPercentage}
                  label="Default Interest Percentage"
                  required
                  inputExtraClass="mb-4"
                  extraLabel={
                    <CustomTooltip text="The default percentage a user can select for investment purposes.">
                      <Info size={32} />
                    </CustomTooltip>
                  }
                  maskOptions={{
                    allowDecimal: true,
                    decimalSymbol: '.',
                    decimalLimit: 3,
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-xl-6">
                <MaskedNumberFormField
                  name="debtTokenInfo.maxInterestPercentage"
                  control={control}
                  errors={errors?.debtTokenInfo?.maxInterestPercentage}
                  label="Max Interest Percentage"
                  required
                  inputExtraClass="mb-4"
                  extraLabel={
                    <CustomTooltip text="The maximum percentage a user can select for investment purposes.">
                      <Info size={32} />
                    </CustomTooltip>
                  }
                  maskOptions={{
                    allowDecimal: true,
                    decimalSymbol: '.',
                    decimalLimit: 3,
                  }}
                />
              </div>
            </div>
          </BorderWithShadow>
        )}

        <BorderWithShadow className="p-4 pb-0 mb-3">
          <div className="row">
            <div className="col-12">
              <SectionHeader>Key Points</SectionHeader>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-4 col-xl-4">
              <MaskedCurrencyFormField
                name="projectedAppraisedAssetValue"
                control={control}
                errors={errors?.projectedAppraisedAssetValue}
                label="Projected Asset Value"
                required
                extraLabel={
                  <CustomTooltip text="The estimated value of the asset upon completion or at a future point in time.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <MaskedCurrencyFormField
                name="totalDevelopmentCost"
                control={control}
                errors={errors?.totalDevelopmentCost}
                label="Total Development Cost"
                required
                extraLabel={
                  <CustomTooltip text="The sum of all expenses associated with developing the project, including construction, permits, and other related costs.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <MaskedCurrencyFormField
                name="totalFundRequired"
                control={control}
                errors={errors?.totalFundRequired}
                label="Total Fund Required"
                required
                extraLabel={
                  <CustomTooltip text="The overall amount of funding needed for the successful execution of the project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedPercentageFormField
                name="targetedInvestorLeveredIrr"
                control={control}
                errors={errors?.targetedInvestorLeveredIrr}
                label="Levered IRR(%)"
                required
                extraLabel={
                  <CustomTooltip text="The internal rate of return (IRR) on the investment, considering leverage or debt in the capital structure.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedPercentageFormField
                name="targetedInvestorUnleveredIrr"
                control={control}
                errors={errors?.targetedInvestorUnleveredIrr}
                label="Unlevered IRR(%)"
                required
                extraLabel={
                  <CustomTooltip text="The internal rate of return (IRR) on the investment without factoring in the impact of leverage or debt.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedNumberFormField
                name="targetedEquityMultiple"
                control={control}
                errors={errors?.targetedEquityMultiple}
                label="Targeted Equity Multiple"
                required
                extraLabel={
                  <CustomTooltip text="The desired multiple of initial equity investment that the sponsor aims to achieve upon project completion.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedNumberFormField
                name="totalDevelopmentPeriodInMonths"
                control={control}
                errors={errors?.totalDevelopmentPeriodInMonths}
                label="Total Development Period (In Months)"
                required
                extraLabel={
                  <CustomTooltip text="The expected or actual duration of the project's development phase, typically measured in months.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedNumberFormField
                name="navPerShare"
                control={control}
                errors={errors?.navPerShare}
                label="NAV Per Share ($500/share)"
                required
                extraLabel={
                  <CustomTooltip text="The net asset value (NAV) per share for investors, often denominated in a specific currency (e.g., $500 per share).">
                    <Info size={32} />
                  </CustomTooltip>
                }
                maskOptions={{
                  allowDecimal: true,
                  decimalSymbol: '.',
                  decimalLimit: 3,
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedNumberFormField
                name="ltmReturnPerShare"
                control={control}
                errors={errors?.ltmReturnPerShare}
                label="LTM Return Per Share"
                required
                extraLabel={
                  <CustomTooltip text="The return per share for investors over the most recent trailing 12-month period.">
                    <Info size={32} />
                  </CustomTooltip>
                }
                maskOptions={{
                  allowDecimal: true,
                  decimalSymbol: '.',
                  decimalLimit: 3,
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedNumberFormField
                name="lifetimeReturn"
                control={control}
                errors={errors?.lifetimeReturn}
                label="Lifetime Return"
                required
                extraLabel={
                  <CustomTooltip text="The total return that investors can expect to receive over the entire investment duration.">
                    <Info size={32} />
                  </CustomTooltip>
                }
                maskOptions={{
                  allowDecimal: true,
                  decimalSymbol: '.',
                  decimalLimit: 3,
                }}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <MaskedPercentageFormField
                name="leased"
                control={control}
                errors={errors?.leased}
                label="% Leased"
                required
                extraLabel={
                  <CustomTooltip text="The percentage of the project's space or units that have been leased or committed to tenants.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 col-md-4 col-xl-4">
              <MaskedNumberFormField
                name="contractedRevenueAsAPercentageOfTheProforma"
                control={control}
                errors={errors?.contractedRevenueAsAPercentageOfTheProforma}
                label="Contracted Revenue as a Percentage of the Proforma"
                required
                extraLabel={
                  <CustomTooltip text="The ratio of contracted revenue (from lease agreements or other contracts) to the projected or pro forma revenue for the project.">
                    <Info size={32} />
                  </CustomTooltip>
                }
                maskOptions={{
                  allowDecimal: true,
                  decimalSymbol: '.',
                  decimalLimit: 3,
                }}
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <MaskedPercentageFormField
                name="esgScore"
                control={control}
                errors={errors?.esgScore}
                label="ESG Score"
                required
                extraLabel={
                  <CustomTooltip text="A numerical or qualitative assessment of the project's environmental, social, and governance (ESG) performance and sustainability practices.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <FormSelectionField
                name="developmentStage"
                control={control}
                errors={errors?.developmentStage}
                label="Development Stage"
                required
                options={DevelopmentStages}
                extraLabel={
                  <CustomTooltip text="The current status or phase of the project's development, such as site preparation, foundation, farming, roofing, fixtures and finishes, or final inspection.">
                    <Info size={32} />
                  </CustomTooltip>
                }
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12">
              <RTEFormField
                label="Offering Summary"
                name="offeringSummary"
                required
                control={control}
                errors={errors?.offeringSummary}
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12">
              <RTEFormField
                label="Waterfall Summary"
                required
                name="waterfallSummary"
                control={control}
                errors={errors?.waterfallSummary}
              />
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12">
              <RTEFormField
                label="Market Overview"
                required
                name="marketOverview"
                control={control}
                errors={errors?.marketOverview}
              />
            </div>
          </div>
        </BorderWithShadow>

        <BorderWithShadow className="p-4 mb-3">
          <div className="row">
            <div className="col-12">
              <SectionHeader>Images and Documents</SectionHeader>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col-12 mb-3">
              <FileUploadInput
                files={coverImages}
                setFiles={setCoverImages}
                maxFiles={1}
                previewImageContainerClass="col-4"
                accept={AcceptFileType.image}
                maxFileSize={4}
                previewMode
                labelText="Cover Image*"
                removeURLFile={removeCoverImage}
              />
              <small>Recommended size: 432x280px. Only PNG format is allowed. Auto-cropping will be applied.</small>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <FileUploadInput
                files={images}
                setFiles={setImages}
                previewImageContainerClass="col-4"
                accept={AcceptFileType.image}
                maxFileSize={4}
                previewMode
                labelText="Pictures*"
                removeURLFile={removeURLImage}
              />
              <small>Recommended size: 524x316px. Only PNG format is allowed. Auto-cropping will be applied.</small>
            </div>
          </div>
          <div className="row g-3 mt-0">
            <div className="col-12">
              <FileUploadInput
                files={documents}
                setFiles={setDocuments}
                onlyButton
                labelText="Public Documents*"
                removeURLFile={removeURLDocument}
              />
            </div>
          </div>
          <div className="row g-3 mt-0">
            <div className="col-12">
              <FileUploadInput
                files={privateDocuments}
                setFiles={setPrivateDocuments}
                onlyButton
                labelText="Private Documents*"
                removeURLFile={removeURLPrivateDocument}
              />
            </div>
          </div>
        </BorderWithShadow>

        {offeringType !== OfferingType.debt && (
          <BorderWithShadow className="p-4 mb-3">
            <TrancheList
              tranches={tranches}
              setTranches={setTranches}
              canTakeAction={isFromAdmin || !data?.lockEdit}
            />
          </BorderWithShadow>
        )}

        <BorderWithShadow className="p-4 mb-3">
          <KeyPointsList
            keyPoints={keyPoints}
            setKeyPoints={setKeyPoints}
            canTakeAction={isFromAdmin || !data?.lockEdit}
          />
        </BorderWithShadow>

        <BorderWithShadow className="p-4 mb-3">
          <FinancialList
            financials={financials}
            setFinancials={setFinancials}
            canTakeAction={isFromAdmin || !data?.lockEdit}
            projectId={id}
          />
        </BorderWithShadow>

        {offeringType !== OfferingType.equity && (
          <BorderWithShadow className="p-4 mb-3">
            <InterestDistributeList
              interestDistributeList={interestSchedules}
              setInterestDistributeList={setInterestSchedules}
              canTakeAction={isFromAdmin || !data?.lockEdit}
              projectId={id}
            />
          </BorderWithShadow>
        )}

        <BorderWithShadow className="p-4 mb-3">
          <ProjectStageList
            setStages={setStages}
            stages={stages}
            canTakeAction={isFromAdmin || !data?.lockEdit}
            projectId={id}
          />
        </BorderWithShadow>

        <BorderWithShadow className="p-4 mb-3">
          <div className="row">
            <div className="col-12">
              <SectionHeader>Location Information</SectionHeader>
            </div>
          </div>
          <div className="row g-3">
            <div className="col">
              <FormTextFormField
                name="aroundProperty.mapLink"
                control={control}
                errors={errors?.aroundProperty?.mapLink}
                tooltip={Strings.mapLink}
                label="Map Link"
                required
              />
            </div>
          </div>
          <AroundPropertyList
            landmarks={landmarks}
            setLandmarks={setLandmarks}
            canTakeAction={isFromAdmin || !data?.lockEdit}
          />
        </BorderWithShadow>

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
      </Form>
    </div>
  )
}
