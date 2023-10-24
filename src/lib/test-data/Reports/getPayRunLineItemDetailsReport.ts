import type {
	IPayRunLineItemDetailsReportDto,
	IReportDto
} from './pay-runs-line-item-details-report-dto';

export const getPayRunLineItemDetailsReport = async (): Promise<
	IReportDto<IPayRunLineItemDetailsReportDto>
> => {
	const url = '/sample-data.json';

	var response = await fetch(url);

	const reportDto: IReportDto<IPayRunLineItemDetailsReportDto> = await response.json();

	return reportDto;
};
