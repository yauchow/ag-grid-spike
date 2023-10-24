export enum PayRunType {
	Standard = 'Standard',
	Manual = 'Manual',
	OpeningBalances = 'OpeningBalances',
	Parallel = 'Parallel'
}

export enum PayRunStatus {
	Draft = 'Draft',
	Verified = 'Verified',
	Published = 'Published'
}

export enum CustomFieldTargetEntity {
	Employee = 'Employee',
	Timesheet = 'Timesheet',
	Leave = 'Leave',
	EmployeeDocument = 'EmployeeDocument',
	EmployeeQualification = 'EmployeeQualification',
	OrganizationDocument = 'OrganizationDocument',
	PayItem = 'PayItem',
	Announcement = 'Announcement',
	Asset = 'Asset',
	Organization = 'Organization'
}

export enum CustomFieldTimePeriodMode {
	Duration = 'Duration',
	StartEndTimes = 'StartEndTimes',
	AllDay = 'AllDay',
	UseTimesheet = 'UseTimesheet'
}

export enum CustomFieldDataType {
	Integer = 'Integer',
	Decimal = 'Decimal',
	Boolean = 'Boolean',
	String = 'String',
	Date = 'Date',
	DropDown = 'DropDown',
	MultiSelect = 'MultiSelect'
}

export enum CustomFieldDisplayStatus {
	Disabled = 'Disabled',
	Admin = 'Admin',
	Employee = 'Employee'
}

export interface ICustomFieldDto {
	customFieldId?: string;
	targetEntity?: CustomFieldTargetEntity;
	dataType?: CustomFieldDataType;
	value?: any | undefined;
	name?: string | undefined;
	displayName?: string | undefined;
	description?: string | undefined;
	enabled?: boolean;
	global?: boolean;
	options?: string[] | undefined;
	isMandatory?: boolean;
	order?: number;
	dateDriven?: boolean;
	timeBased?: boolean;
	displayOnTimesheetSummary?: boolean;
	preventMultipleEntries?: boolean;
	timePeriodMode?: CustomFieldTimePeriodMode | undefined;
	inheritTimesheetPeriod?: boolean | undefined;
	customFieldDisplayStatus?: CustomFieldDisplayStatus | undefined;
}

export interface ICustomFieldsDto {
	[key: string]: ICustomFieldDto;
}

export interface IPayRunLineItemDetailsReportDto {
	organisationName?: string | undefined;
	glCode?: string | undefined;
	exportCode?: string | undefined;
	employeeNumber?: string | undefined;
	printName?: string | undefined;
	firstName?: string | undefined;
	surname?: string | undefined;
	employmentStatus?: string | undefined;
	payRunNumber?: number;
	paymentDate?: string | undefined;
	payCalendar?: string | undefined;
	payRunType?: PayRunType;
	payRunStatus?: PayRunStatus;
	isBackpay?: boolean | undefined;
	date?: string | undefined;
	payItemType?: string | undefined;
	payItemCode?: string | undefined;
	payItem?: string | undefined;
	unitOfMeasure?: string | undefined;
	units?: number;
	rate?: number;
	total?: number;
	awardPolicyName?: string | undefined;
	awardSource?: string | undefined;
	payItemGlDebitCode?: string | undefined;
	payItemGlCreditCode?: string | undefined;
	role?: string | undefined;
	roleCode?: string | undefined;
	project?: string | undefined;
	projectGlCode?: string | undefined;
	projectCode?: string | undefined;
	location?: string | undefined;
	locationGlCode?: string | undefined;
	locationCode?: string | undefined;
	department?: string | undefined;
	departmentGlCode?: string | undefined;
	departmentCode?: string | undefined;
	workOrder?: string | undefined;
	workOrderGLCode?: string | undefined;
	workOrderCode?: string | undefined;
	superFundName?: string | undefined;
	leaveType?: string | undefined;
	leaveReason?: string | undefined;
	periodStartDate?: string;
	periodEndDate?: string;
	notes?: string | undefined;
	payItemCustomFields?: ICustomFieldsDto;
}

export enum ReportHeaderDataType {
	Text = 'Text',
	Number = 'Number',
	Currency = 'Currency',
	Date = 'Date',
	TimeOfDay = 'TimeOfDay',
	TimeOfDayWithOffset = 'TimeOfDayWithOffset',
	DateTime = 'DateTime',
	DateTimeUtc = 'DateTimeUtc',
	DateTimeWithOffset = 'DateTimeWithOffset',
	Boolean = 'Boolean',
	Duration = 'Duration',
	Percentage = 'Percentage',
	TextArray = 'TextArray',
	Attachments = 'Attachments'
}

export enum ReportAggregationMode {
	None = 'None',
	Count = 'Count',
	Sum = 'Sum',
	Min = 'Min',
	Max = 'Max'
}

export interface ReportCellStyle {
	[key: string]: string | number;
}

export interface IReportHeaderDto {
	title?: string | undefined;
	filterDisabled?: boolean;
	sortDisabled?: boolean;
	hiddenByDefault?: boolean;
	searchDisabled?: boolean;
	dataType?: ReportHeaderDataType;
	fieldName?: string | undefined;
	defaultPivotColumnOrder?: number;
	defaultPivotRowOrder?: number;
	defaultPivotValueOrder?: number;
	defaultSortOrder?: number;
	defaultSortDirection?: string | undefined;
	defaultPivotAggregation?: ReportAggregationMode | undefined;
	isDynamicColumns?: boolean;
	isCustomFields?: boolean;
	customFieldsKeyName?: string | undefined;
	createDayOfWeekColumn?: boolean;
	prependBaseColumnNameToDayOfWeekColumn?: boolean;
	trueText?: string | undefined;
	falseText?: string | undefined;
	nullDisplayText?: string | undefined;
	disableDefaultAggregation?: boolean;
	numericPrecision?: number | undefined;
	cellStyle?: ReportCellStyle;
}

/** Represents some additional data field that describes a report. */
export interface IExtraReportDataDto {
	/** Refers to a description of the value. */
	name?: string | undefined;
	/** Refers to some value describing a report. */
	value?: string | undefined;
}

export interface IReportDto<T> {
	headers?: IReportHeaderDto[] | undefined;
	reportData?: T[] | undefined;
	extraReportData?: IExtraReportDataDto[] | undefined;
	serverTime?: string;
	addFooterRow?: boolean;
	addStatusBar?: boolean;
	reportVariantTag?: string | undefined;
}
