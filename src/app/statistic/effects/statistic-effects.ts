import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  GetStatisticExpandedById,
  GetStatisticExpandedByIdSuccess,
  GetStatisticShort,
  GetStatisticShortSuccess,
  StatisticActionTypes
} from '../actions/statistic-actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {StatisticService} from '../../shared/services/statistic.service';
import {IMonthDetail, IMonthShort} from '../../shared/models/statistic.model';

const toPayload = <T>(action: { payload: T }) => action.payload;

@Injectable()
export class StatisticsEffects {

  @Effect()
  fetchStatistics$: Observable<Action> = this.actions$.pipe(
    ofType<GetStatisticShort>(StatisticActionTypes.GetStatisticShort),
    exhaustMap(action => this.statisticService.getStatisticShort().pipe(
      map((statistics: IMonthShort[]) => new GetStatisticShortSuccess(statistics) ),
      catchError((e) => { throw new Error(e) })
    ))
  );
  @Effect()
  fetchStatisticExpanded$: Observable<Action> = this.actions$.pipe(
    ofType<GetStatisticExpandedById>(StatisticActionTypes.GetStatisticExpandedById),
    map(toPayload),
    exhaustMap(payload => this.statisticService.getStatisticExpanded(payload).pipe(
      map((statistic: IMonthDetail) => new GetStatisticExpandedByIdSuccess(statistic)),
      catchError((e) => { throw new Error(e) })
    ))
  );

  constructor(
    private actions$: Actions,
    private statisticService: StatisticService
  ) {}

}
