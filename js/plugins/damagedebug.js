(() => {
  const _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    const action = this._action;
    if (!action) return _BattleManager_startAction.call(this);

    const subject = this._subject;
    const targets = action.makeTargets();

    console.group(`BattleManager startAction`);
    console.log(`Subject: ${subject ? subject.name() : 'None'}`);
    console.log(`Action: ${action.item().name}`);
    console.log(`Targets: ${targets.map(t => `${t.isActor() ? 'Actor' : 'Enemy'} "${t.name()}"`).join(', ') || 'None'}`);
    console.groupEnd();

    return _BattleManager_startAction.call(this);
  };
})();
